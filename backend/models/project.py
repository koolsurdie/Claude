from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Enum as SAEnum
from database import Base
import enum


class ProjectStatus(str, enum.Enum):
    draft = "draft"
    in_review = "in_review"
    approved = "approved"
    exported = "exported"


class ProjectLanguage(str, enum.Enum):
    en = "en"
    fr = "fr"
    both = "both"


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    status = Column(SAEnum(ProjectStatus), default=ProjectStatus.draft, nullable=False)
    owner = Column(String(255), nullable=False)
    language = Column(SAEnum(ProjectLanguage), default=ProjectLanguage.both, nullable=False)
    source_filename = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
