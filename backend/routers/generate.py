from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime

from database import get_db
from models.project import Project
from models.screen import Screen, ScreenType, InteractionType
from services.ai import generate_storyboard

router = APIRouter(prefix="/api/projects", tags=["generate"])


class GenerateRequest(BaseModel):
    text: str


@router.post("/{project_id}/generate")
def generate(project_id: int, body: GenerateRequest, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if not body.text or not body.text.strip():
        raise HTTPException(status_code=400, detail="No text provided for generation")

    try:
        screens_data = generate_storyboard(body.text)
    except ValueError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")

    # Delete existing screens for this project
    db.query(Screen).filter(Screen.project_id == project_id).delete()

    created = []
    for i, sd in enumerate(screens_data):
        # Safely coerce enum values
        raw_type = sd.get("screen_type", "content")
        try:
            screen_type = ScreenType(raw_type)
        except ValueError:
            screen_type = ScreenType.content

        raw_interaction = sd.get("interaction_type", "static")
        try:
            interaction_type = InteractionType(raw_interaction)
        except ValueError:
            interaction_type = InteractionType.static

        screen = Screen(
            project_id=project_id,
            screen_number=sd.get("screen_number", i + 1),
            screen_type=screen_type,
            title_en=sd.get("title_en"),
            title_fr=sd.get("title_fr"),
            narration_en=sd.get("narration_en"),
            narration_fr=sd.get("narration_fr"),
            visual_direction=sd.get("visual_direction"),
            interaction_type=interaction_type,
            synthesia_note=sd.get("synthesia_note"),
            vyond_note=sd.get("vyond_note"),
            articulate_note=sd.get("articulate_note"),
            quiz=sd.get("quiz"),
        )
        db.add(screen)
        created.append(screen)

    project.updated_at = datetime.utcnow()
    db.commit()

    for s in created:
        db.refresh(s)

    return {
        "screens_created": len(created),
        "screens": [
            {
                "id": s.id,
                "screen_number": s.screen_number,
                "screen_type": s.screen_type,
                "title_en": s.title_en,
                "title_fr": s.title_fr,
                "narration_en": s.narration_en,
                "narration_fr": s.narration_fr,
                "visual_direction": s.visual_direction,
                "interaction_type": s.interaction_type,
                "synthesia_note": s.synthesia_note,
                "vyond_note": s.vyond_note,
                "articulate_note": s.articulate_note,
                "quiz": s.quiz,
            }
            for s in created
        ],
    }
