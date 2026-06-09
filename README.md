# IntelliBoard

An internal AI-powered instructional design storyboard tool. Ingest source documents, generate bilingual (EN/FR) e-learning storyboards with Claude AI, and export to Word/Excel.

## Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Python FastAPI
- **Database**: PostgreSQL 15
- **AI**: Anthropic Claude (claude-sonnet-4-6)
- **Orchestration**: Docker Compose

## Quick Start

### 1. Clone and configure

```bash
git clone <repo>
cd intelliboard
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### 2. Start with Docker Compose

```bash
docker compose up --build
```

### 3. Open the app

- Frontend: http://localhost:3000
- Backend API docs: http://localhost:8000/docs

## Usage

1. Click **New Project** — enter project name, owner, language preference
2. Upload a source document (PDF, DOCX, PPTX, TXT)
3. AI automatically generates a bilingual storyboard (8–15 screens)
4. Inline-edit any screen in the **Project View**
5. Update status: Draft → In Review → Approved → Exported
6. Export the storyboard as **.docx** or quiz bank as **.xlsx**

## Development (without Docker)

### Backend

```bash
cd backend
pip install -r requirements.txt
DATABASE_URL=postgresql://id_user:id_pass@localhost:5432/intelliboard \
  ANTHROPIC_API_KEY=your_key \
  uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/projects` | Create project |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/{id}` | Get project + screens |
| PUT | `/api/projects/{id}` | Update project |
| DELETE | `/api/projects/{id}` | Delete project |
| POST | `/api/projects/{id}/ingest` | Upload + parse file |
| POST | `/api/projects/{id}/generate` | Generate storyboard with AI |
| PUT | `/api/projects/{id}/screens/{sid}` | Edit a screen |
| GET | `/api/projects/{id}/export/storyboard` | Download Word storyboard |
| GET | `/api/projects/{id}/export/quiz` | Download Excel quiz bank |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `DATABASE_URL` | PostgreSQL connection string |
