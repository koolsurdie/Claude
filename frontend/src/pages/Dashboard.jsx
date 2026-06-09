import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listProjects } from '../lib/api'
import ProjectCard from '../components/ProjectCard'

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700 }}>Projects</h1>
          <p style={{ margin: '0.25rem 0 0', color: '#888', fontSize: '0.9rem' }}>
            AI-powered instructional design storyboards
          </p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/projects/new')}>
          + New Project
        </button>
      </div>

      {loading && <p style={{ color: '#888' }}>Loading projects…</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && projects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', border: '2px dashed #ccc' }}>
          <p style={{ color: '#888', fontSize: '1.1rem', margin: 0 }}>No projects yet.</p>
          <button
            className="btn-primary"
            style={{ marginTop: '1rem' }}
            onClick={() => navigate('/projects/new')}
          >
            Create your first project
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  )
}
