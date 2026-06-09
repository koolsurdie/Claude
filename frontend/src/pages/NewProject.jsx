import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProject, ingestFile, generateStoryboard } from '../lib/api'
import UploadZone from '../components/UploadZone'

export default function NewProject() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [language, setLanguage] = useState('both')
  const [file, setFile] = useState(null)
  const [step, setStep] = useState('form') // form | uploading | generating | done
  const [error, setError] = useState(null)

  const labelStyle = {
    display: 'block',
    fontSize: '0.78rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: '0.3rem',
    color: '#000',
  }

  const inputStyle = {
    width: '100%',
    border: '1.5px solid #000',
    padding: '0.5rem 0.75rem',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: '0.9rem',
    borderRadius: 0,
    marginBottom: '1.25rem',
    outline: 'none',
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !owner.trim()) {
      setError('Project name and owner are required.')
      return
    }
    setError(null)

    try {
      setStep('uploading')
      const project = await createProject({ name, owner, language })

      let text = ''
      if (file) {
        const ingestResult = await ingestFile(project.id, file)
        text = ingestResult.text
      }

      if (text) {
        setStep('generating')
        await generateStoryboard(project.id, text)
      }

      setStep('done')
      navigate(`/projects/${project.id}`)
    } catch (e) {
      setError(e.response?.data?.detail || e.message)
      setStep('form')
    }
  }

  const isLoading = step !== 'form'

  return (
    <div style={{ padding: '2rem', maxWidth: 620 }}>
      <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.25rem' }}>New Project</h1>
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Create a project, upload your source content, and let AI generate your storyboard.
      </p>

      {error && (
        <div style={{ background: '#fff0e6', border: '1.5px solid #FF7900', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Project Name *</label>
        <input
          style={inputStyle}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Workplace Safety Module"
          disabled={isLoading}
        />

        <label style={labelStyle}>Owner *</label>
        <input
          style={inputStyle}
          value={owner}
          onChange={e => setOwner(e.target.value)}
          placeholder="e.g. Jane Doe"
          disabled={isLoading}
        />

        <label style={labelStyle}>Language</label>
        <select
          style={{ ...inputStyle }}
          value={language}
          onChange={e => setLanguage(e.target.value)}
          disabled={isLoading}
        >
          <option value="both">Bilingual (EN + FR)</option>
          <option value="en">English only</option>
          <option value="fr">French only</option>
        </select>

        <label style={{ ...labelStyle, marginBottom: '0.5rem' }}>Source Document (optional)</label>
        <div style={{ marginBottom: '1.5rem' }}>
          <UploadZone onFile={setFile} />
          <p style={{ color: '#888', fontSize: '0.78rem', marginTop: '0.35rem' }}>
            If provided, AI will parse the document and generate storyboard screens automatically.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button type="submit" className="btn-primary" disabled={isLoading} style={{ minWidth: 160 }}>
            {step === 'uploading' ? 'Uploading…' :
             step === 'generating' ? 'Generating storyboard…' :
             file ? 'Create & Generate' : 'Create Project'}
          </button>
          <button type="button" className="btn-outline" onClick={() => navigate('/dashboard')} disabled={isLoading}>
            Cancel
          </button>
        </div>

        {isLoading && (
          <p style={{ color: '#FF7900', fontSize: '0.85rem', marginTop: '1rem' }}>
            {step === 'uploading' && 'Parsing your document…'}
            {step === 'generating' && 'Claude is generating your storyboard — this may take 15-30 seconds…'}
          </p>
        )}
      </form>
    </div>
  )
}
