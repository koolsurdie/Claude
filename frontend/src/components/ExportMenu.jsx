import { useState } from 'react'
import { storyboardExportUrl, quizExportUrl } from '../lib/api'

export default function ExportMenu({ projectId }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button className="btn-outline" onClick={() => setOpen(v => !v)}>
        Export ▾
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            background: '#fff',
            border: '1.5px solid #000',
            minWidth: 200,
            zIndex: 100,
          }}
          onMouseLeave={() => setOpen(false)}
        >
          <a
            href={storyboardExportUrl(projectId)}
            download
            style={{ display: 'block', padding: '0.6rem 1rem', textDecoration: 'none', color: '#000', fontSize: '0.88rem' }}
            onMouseEnter={e => e.target.style.background = '#f0f0f0'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
            onClick={() => setOpen(false)}
          >
            Storyboard (.docx)
          </a>
          <a
            href={quizExportUrl(projectId)}
            download
            style={{ display: 'block', padding: '0.6rem 1rem', textDecoration: 'none', color: '#000', fontSize: '0.88rem', borderTop: '1px solid #eee' }}
            onMouseEnter={e => e.target.style.background = '#f0f0f0'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
            onClick={() => setOpen(false)}
          >
            Quiz Bank (.xlsx)
          </a>
        </div>
      )}
    </div>
  )
}
