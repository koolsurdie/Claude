from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from datetime import datetime

from database import get_db
from models.project import Project
from services.parser import parse_file

router = APIRouter(prefix="/api/projects", tags=["ingest"])

SUPPORTED_EXTENSIONS = {".pdf", ".docx", ".doc", ".pptx", ".ppt", ".txt"}


@router.post("/{project_id}/ingest")
async def ingest_file(
    project_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    filename = file.filename or "upload"
    ext = "." + filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    if ext not in SUPPORTED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{ext}'. Supported: {', '.join(SUPPORTED_EXTENSIONS)}",
        )

    content = await file.read()
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    try:
        extracted_text = parse_file(filename, content)
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Failed to parse file: {str(e)}")

    project.source_filename = filename
    project.updated_at = datetime.utcnow()
    db.commit()

    return {
        "filename": filename,
        "characters": len(extracted_text),
        "preview": extracted_text[:500],
        "text": extracted_text,
    }
