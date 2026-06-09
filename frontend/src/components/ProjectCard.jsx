import { useNavigate } from 'react-router-dom'
import Badge from './Badge'

export default function ProjectCard({ project }) {
  const navigate = useNavigate()
  const updated = project.updated_at
    ? new Date(project.updated_at).toLocaleDateString('en-CA')
    : '—'

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      style={{
        border: '1.5px solid #000',
        padding: '1.25rem',
        cursor: 'pointer',
        background: '#fff',
        transition: 'box-shadow 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '4px 4px 0 #FF7900'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{project.name}</h3>
        <Badge status={project.status} />
      </div>
      <div style={{ color: '#888', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
        Owner: <strong style={{ color: '#000' }}>{project.owner}</strong>
      </div>
      <div style={{ color: '#888', fontSize: '0.82rem', marginBottom: '0.25rem' }}>
        Language: <strong style={{ color: '#000' }}>{project.language?.toUpperCase()}</strong>
      </div>
      {project.source_filename && (
        <div style={{ color: '#888', fontSize: '0.78rem', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Source: {project.source_filename}
        </div>
      )}
      <div style={{ color: '#888', fontSize: '0.78rem', marginTop: '0.75rem', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
        Updated: {updated}
      </div>
    </div>
  )
}
