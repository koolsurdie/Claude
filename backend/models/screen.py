from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON, Enum as SAEnum
from database import Base
import enum


class ScreenType(str, enum.Enum):
    title = "title"
    objective = "objective"
    content = "content"
    knowledge_check = "knowledge_check"
    summary = "summary"


class InteractionType(str, enum.Enum):
    static = "static"
    click_reveal = "click-reveal"
    quiz = "quiz"
    video = "video"


class Screen(Base):
    __tablename__ = "screens"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    screen_number = Column(Integer, nullable=False)
    screen_type = Column(SAEnum(ScreenType), default=ScreenType.content, nullable=False)
    title_en = Column(String(500), nullable=True)
    title_fr = Column(String(500), nullable=True)
    narration_en = Column(Text, nullable=True)
    narration_fr = Column(Text, nullable=True)
    visual_direction = Column(Text, nullable=True)
    interaction_type = Column(SAEnum(InteractionType), default=InteractionType.static, nullable=False)
    synthesia_note = Column(Text, nullable=True)
    vyond_note = Column(Text, nullable=True)
    articulate_note = Column(Text, nullable=True)
    quiz = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
