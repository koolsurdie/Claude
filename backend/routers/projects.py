from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List

from database import get_db
from models.project import Project, ProjectStatus, ProjectLanguage
from models.screen import Screen

router = APIRouter(prefix="/api/projects", tags=["projects"])


class ProjectCreate(BaseModel):
    name: str
    owner: str
    language: ProjectLanguage = ProjectLanguage.both


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[ProjectStatus] = None
    owner: Optional[str] = None
    language: Optional[ProjectLanguage] = None


class ScreenUpdate(BaseModel):
    screen_type: Optional[str] = None
    title_en: Optional[str] = None
    title_fr: Optional[str] = None
    narration_en: Optional[str] = None
    narration_fr: Optional[str] = None
    visual_direction: Optional[str] = None
    interaction_type: Optional[str] = None
    synthesia_note: Optional[str] = None
    vyond_note: Optional[str] = None
    articulate_note: Optional[str] = None
    quiz: Optional[dict] = None


def project_to_dict(p: Project) -> dict:
    return {
        "id": p.id,
        "name": p.name,
        "status": p.status,
        "owner": p.owner,
        "language": p.language,
        "source_filename": p.source_filename,
        "created_at": p.created_at.isoformat() if p.created_at else None,
        "updated_at": p.updated_at.isoformat() if p.updated_at else None,
    }


def screen_to_dict(s: Screen) -> dict:
    return {
        "id": s.id,
        "project_id": s.project_id,
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
        "created_at": s.created_at.isoformat() if s.created_at else None,
        "updated_at": s.updated_at.isoformat() if s.updated_at else None,
    }


@router.post("")
def create_project(data: ProjectCreate, db: Session = Depends(get_db)):
    project = Project(
        name=data.name,
        owner=data.owner,
        language=data.language,
        status=ProjectStatus.draft,
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project_to_dict(project)


@router.get("")
def list_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).order_by(Project.updated_at.desc()).all()
    return [project_to_dict(p) for p in projects]


@router.get("/{project_id}")
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    screens = (
        db.query(Screen)
        .filter(Screen.project_id == project_id)
        .order_by(Screen.screen_number)
        .all()
    )
    result = project_to_dict(project)
    result["screens"] = [screen_to_dict(s) for s in screens]
    return result


@router.put("/{project_id}")
def update_project(project_id: int, data: ProjectUpdate, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if data.name is not None:
        project.name = data.name
    if data.status is not None:
        project.status = data.status
    if data.owner is not None:
        project.owner = data.owner
    if data.language is not None:
        project.language = data.language
    project.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(project)
    return project_to_dict(project)


@router.put("/{project_id}/screens/{screen_id}")
def update_screen(project_id: int, screen_id: int, data: ScreenUpdate, db: Session = Depends(get_db)):
    screen = (
        db.query(Screen)
        .filter(Screen.id == screen_id, Screen.project_id == project_id)
        .first()
    )
    if not screen:
        raise HTTPException(status_code=404, detail="Screen not found")

    for field, value in data.model_dump(exclude_none=True).items():
        setattr(screen, field, value)
    screen.updated_at = datetime.utcnow()

    # Update project updated_at
    project = db.query(Project).filter(Project.id == project_id).first()
    if project:
        project.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(screen)
    return screen_to_dict(screen)


@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.query(Screen).filter(Screen.project_id == project_id).delete()
    db.delete(project)
    db.commit()
    return {"ok": True}
