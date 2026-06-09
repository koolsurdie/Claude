import { useParams, useNavigate } from 'react-router-dom'
import ExportMenu from '../components/ExportMenu'

export default function ExportPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div style={{ padding: '2rem', maxWidth: 600 }}>
      <button
        onClick={() => navigate(`/projects/${id}`)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '0.85rem', padding: 0, marginBottom: '1.5rem' }}
      >
        ← Back to Project
      </button>

      <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.25rem' }}>Export</h1>
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Download your storyboard and quiz assets in various formats.
      </p>

      <div style={{ border: '1.5px solid #000', padding: '1.5rem', marginBottom: '1rem' }}>
        <h2 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700 }}>Available Exports</h2>
        <p style={{ margin: '0 0 1rem', color: '#888', fontSize: '0.85rem' }}>
          All exports are generated from the current storyboard screens.
        </p>
        <ExportMenu projectId={id} />
      </div>

      <div style={{ border: '1px solid #e0e0e0', padding: '1rem', background: '#fafafa' }}>
        <p style={{ margin: 0, fontSize: '0.82rem', color: '#888' }}>
          <strong style={{ color: '#000' }}>Word Storyboard</strong> — Full bilingual storyboard with narration, visual direction, and interaction notes.
        </p>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.82rem', color: '#888' }}>
          <strong style={{ color: '#000' }}>Quiz Bank</strong> — All knowledge check questions and answer options in Excel format.
        </p>
      </div>
    </div>
  )
}
