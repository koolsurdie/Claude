# IntelliBoard — AI Storyboard Builder for ID Teams

IntelliBoard ingests training documents and automatically generates bilingual (EN/FR) instructional design storyboards using Claude AI. Teams can review, edit, and export storyboards to Word, Excel, Synthesia, Vyond, and Articulate formats.

## Prerequisites

- Docker Desktop (includes Docker Compose)

## Setup

1. Clone this repository
2. Copy the example environment file: `cp .env.example .env`
3. Open `.env` and add your Anthropic API key
4. Start all services: `docker compose up --build`
5. Open your browser at http://localhost:3000

## Supported Input Formats

- PDF documents
- Word documents (.docx, .doc)
- PowerPoint presentations (.pptx, .ppt)
- Plain text files (.txt)

## Export Formats

| Format | Description |
|---|---|
| Word Storyboard (.docx) | Full bilingual storyboard with narration, visual direction, and tool notes |
| Quiz Bank (.xlsx) | All knowledge check questions and answer options |
| Synthesia Script (.docx) | Avatar script formatted for Synthesia video production |
| Vyond Brief (.docx) | Animation brief formatted for Vyond |
| Articulate Outline (.docx) | Course outline for Articulate Storyline/Rise |

## Brand Notes

- Font: Helvetica Neue / Helvetica / Arial
- Accent colour: #FF7900 (buttons, active states, links)
- Backgrounds: white (#FFFFFF) or black (#000000)
- No border-radius — sharp corners throughout
