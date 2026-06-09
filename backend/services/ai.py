import os
import json
import anthropic

SYSTEM_PROMPT = """You are an expert instructional designer specializing in bilingual (English/French) e-learning storyboards.
Given source content, produce a structured storyboard in JSON format.
Return ONLY valid JSON — no markdown fences, no explanation, just the JSON array."""

USER_PROMPT_TEMPLATE = """Analyze the following source content and create a comprehensive e-learning storyboard.

SOURCE CONTENT:
{text}

Return a JSON array of screen objects. Each screen must have ALL of these fields:
- screen_number: integer (1-based)
- screen_type: one of "title", "objective", "content", "knowledge_check", "summary"
- title_en: English screen title (string)
- title_fr: French screen title (string)
- narration_en: Full English narration script for the screen (string, 2-5 sentences)
- narration_fr: Full French narration script (string, 2-5 sentences)
- visual_direction: Description of what should appear visually on screen (string)
- interaction_type: one of "static", "click-reveal", "quiz", "video"
- synthesia_note: Note for Synthesia AI avatar video production (string or null)
- vyond_note: Note for Vyond animated video production (string or null)
- articulate_note: Note for Articulate Storyline/Rise development (string or null)
- quiz: null unless screen_type is "knowledge_check", in which case an object with:
    - question_en: English question text
    - question_fr: French question text
    - options: array of 4 answer strings (in English)
    - answer: index (0-3) of the correct option

Create a logical flow: start with a title screen, then 1-2 objective screens, then content screens (one per major topic), knowledge checks after key concepts, and end with a summary screen.
Aim for 8-15 screens total depending on content depth.
Return ONLY the JSON array."""


def generate_storyboard(extracted_text: str) -> list[dict]:
    """Call Claude to generate a storyboard from extracted text."""
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise ValueError("ANTHROPIC_API_KEY environment variable is not set")

    client = anthropic.Anthropic(api_key=api_key)

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=8192,
        system=SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": USER_PROMPT_TEMPLATE.format(text=extracted_text[:50000]),
            }
        ],
    )

    raw = message.content[0].text.strip()

    # Strip markdown fences if model wrapped them anyway
    if raw.startswith("```"):
        lines = raw.split("\n")
        raw = "\n".join(lines[1:-1]) if lines[-1].strip() == "```" else "\n".join(lines[1:])

    screens = json.loads(raw)
    return screens
