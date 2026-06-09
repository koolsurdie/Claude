import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProject, ingestFile, generateStoryboard, updateProject } from '../lib/api'
import ScreenEditor from '../components/ScreenEditor'
import Badge from '../components/Badge'
import ExportMenu from '../components/ExportMenu'
import UploadZone from '../components/UploadZone'

const STATUS_OPTIONS = ['draft', 'in_review', 'approved', 'exported']

export default function ProjectView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [screens, setScreens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [regenFile, setRegenFile] = useState(null)
  const [regenerating, setRegenerating] = useState(false)
  const [statusUpdating, setStatusUpdating] = useState(false)

  useEffect(() => {
    getProject(id)
      .then(data => {
        setProject(data)
        setScreens(data.screens || [])
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleScreenUpdate = (updated) => {
    setScreens(prev => prev.map(s => s.id === updated.id ? updated : s))
  }

  const handleRegenerate = async () => {
    if (!regenFile) return
    setRegenerating(true)
    try {
      const ingestResult = await ingestFile(id, regenFile)
      await generateStoryboard(id, ingestResult.text)
      const data = await getProject(id)
      setProject(data)
      setScreens(data.screens || [])
      setRegenFile(null)
    } catch (e) {
      alert('Generation failed: ' + (e.response?.data?.detail || e.message))
    } finally {
      setRegenerating(false)
    }
  }

  const handleStatusChange = async (newStatus) => {
    setStatusUpdating(true)
    try {
      const updated = await updateProject(id, { status: newStatus })
      setProject(prev => ({ ...prev, status: updated.status }))
    } catch (e) {
      alert('Status update failed: ' + e.message)
    } finally {
      setStatusUpdating(false)
    }
  }

  if (loading) return <div style={{ padding: '2rem', color: '#888' }}>Loading…</div>
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>
  if (!project) return null

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '0.85rem', padding: 0, marginBottom: '0.5rem' }}
          >
            ← Back to Dashboard
          </button>
          <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700 }}>{project.name}</h1>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.4rem' }}>
            <Badge status={project.status} />
            <span style={{ color: '#888', fontSize: '0.82rem' }}>Owner: {project.owner}</span>
            <span style={{ color: '#888', fontSize: '0.82rem' }}>Lang: {project.language?.toUpperCase()}</span>
            <span style={{ color: '#888', fontSize: '0.82rem' }}>{screens.length} screens</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {/* Status selector */}
          <select
            value={project.status}
            onChange={e => handleStatusChange(e.target.value)}
            disabled={statusUpdating}
            style={{
              border: '1.5px solid #000',
              padding: '0.4rem 0.6rem',
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: '0.82rem',
              borderRadius: 0,
              cursor: 'pointer',
            }}
          >
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
          </select>
          <ExportMenu projectId={id} />
        </div>
      </div>

      {/* Re-generate section */}
      <div style={{ border: '1px solid #e0e0e0', padding: '1rem', marginBottom: '1.5rem', background: '#fafafa' }}>
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
          Re-generate Storyboard
        </p>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.78rem', color: '#888' }}>
          Upload a new or updated source document to regenerate all screens using AI.
        </p>
        <UploadZone onFile={setRegenFile} />
        {regenFile && (
          <button
            className="btn-primary"
            style={{ marginTop: '0.75rem' }}
            onClick={handleRegenerate}
            disabled={regenerating}
          >
            {regenerating ? 'Generating…' : 'Generate Storyboard'}
          </button>
        )}
        {regenerating && (
          <p style={{ color: '#FF7900', fontSize: '0.82rem', marginTop: '0.5rem' }}>
            Claude is generating your storyboard — this may take 15-30 seconds…
          </p>
        )}
      </div>

      {/* Screens */}
      {screens.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', border: '2px dashed #ccc', color: '#888' }}>
          No screens yet. Upload a document above to generate the storyboard.
        </div>
      ) : (
        <div>
          {/* Column headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2.5rem 7rem 1fr 1fr 6rem',
              gap: '0.5rem',
              padding: '0.4rem 0.75rem',
              background: '#000',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '0.25rem',
            }}
          >
            <span>#</span>
            <span>Type</span>
            <span>Narration (EN)</span>
            <span>Narration (FR)</span>
            <span></span>
          </div>
          {screens.map(screen => (
            <ScreenEditor
              key={screen.id}
              screen={screen}
              projectId={id}
              onUpdate={handleScreenUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}
