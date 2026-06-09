from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

from database import get_db
from models.project import Project
from models.screen import Screen
from services.exporter import build_storyboard_docx, build_quiz_xlsx

router = APIRouter(prefix="/api/projects", tags=["export"])


@router.get("/{project_id}/export/storyboard")
def export_storyboard(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    screens = (
        db.query(Screen)
        .filter(Screen.project_id == project_id)
        .order_by(Screen.screen_number)
        .all()
    )
    if not screens:
        raise HTTPException(status_code=404, detail="No screens found — generate storyboard first")

    docx_bytes = build_storyboard_docx(project.name, screens)
    safe_name = project.name.replace(" ", "_").replace("/", "-")
    filename = f"{safe_name}_storyboard.docx"

    return Response(
        content=docx_bytes,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.get("/{project_id}/export/quiz")
def export_quiz(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    screens = (
        db.query(Screen)
        .filter(Screen.project_id == project_id)
        .order_by(Screen.screen_number)
        .all()
    )
    quiz_screens = [s for s in screens if s.quiz]
    if not quiz_screens:
        raise HTTPException(status_code=404, detail="No quiz screens found in this project")

    xlsx_bytes = build_quiz_xlsx(project.name, quiz_screens)
    safe_name = project.name.replace(" ", "_").replace("/", "-")
    filename = f"{safe_name}_quiz_bank.xlsx"

    return Response(
        content=xlsx_bytes,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
