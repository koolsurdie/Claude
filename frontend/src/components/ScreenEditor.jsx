import { useState } from 'react'
import { updateScreen } from '../lib/api'

const SCREEN_TYPES = ['title', 'objective', 'content', 'knowledge_check', 'summary']
const INTERACTION_TYPES = ['static', 'click-reveal', 'quiz', 'video']

export default function ScreenEditor({ screen, projectId, onUpdate }) {
  const [data, setData] = useState({ ...screen })
  const [saving, setSaving] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const updated = await updateScreen(projectId, screen.id, data)
      onUpdate(updated)
    } catch (e) {
      alert('Save failed: ' + (e.response?.data?.detail || e.message))
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    width: '100%',
    border: '1px solid #ccc',
    padding: '0.3rem 0.5rem',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: '0.82rem',
    borderRadius: 0,
    resize: 'vertical',
  }

  const labelStyle = {
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    color: '#888',
    display: 'block',
    marginBottom: '0.15rem',
  }

  return (
    <div style={{ border: '1px solid #e0e0e0', marginBottom: '0.75rem' }}>
      {/* Row header */}
      <div
        onClick={() => setExpanded(v => !v)}
        style={{
          display: 'grid',
          gridTemplateColumns: '2.5rem 7rem 1fr 1fr 6rem',
          gap: '0.5rem',
          padding: '0.6rem 0.75rem',
          background: '#fafafa',
          cursor: 'pointer',
          alignItems: 'center',
          borderBottom: expanded ? '1px solid #e0e0e0' : 'none',
        }}
      >
        <strong style={{ color: '#FF7900' }}>#{data.screen_number}</strong>
        <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>
          {data.screen_type?.replace('_', ' ')}
        </span>
        <span style={{ fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#333' }}>
          {data.narration_en?.slice(0, 80) || <em style={{ color: '#aaa' }}>No narration</em>}
        </span>
        <span style={{ fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#555' }}>
          {data.narration_fr?.slice(0, 80) || ''}
        </span>
        <span style={{ fontSize: '0.72rem', color: '#888', textAlign: 'right' }}>
          {expanded ? '▲ collapse' : '▼ edit'}
        </span>
      </div>

      {/* Expanded editor */}
      {expanded && (
        <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Screen Type</label>
              <select value={data.screen_type} onChange={e => handleChange('screen_type', e.target.value)} style={inputStyle}>
                {SCREEN_TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Title (EN)</label>
              <input style={inputStyle} value={data.title_en || ''} onChange={e => handleChange('title_en', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Title (FR)</label>
              <input style={inputStyle} value={data.title_fr || ''} onChange={e => handleChange('title_fr', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Narration (EN)</label>
              <textarea rows={4} style={inputStyle} value={data.narration_en || ''} onChange={e => handleChange('narration_en', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Narration (FR)</label>
              <textarea rows={4} style={inputStyle} value={data.narration_fr || ''} onChange={e => handleChange('narration_fr', e.target.value)} />
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Interaction Type</label>
              <select value={data.interaction_type} onChange={e => handleChange('interaction_type', e.target.value)} style={inputStyle}>
                {INTERACTION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Visual Direction</label>
              <textarea rows={3} style={inputStyle} value={data.visual_direction || ''} onChange={e => handleChange('visual_direction', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Synthesia Note</label>
              <textarea rows={2} style={inputStyle} value={data.synthesia_note || ''} onChange={e => handleChange('synthesia_note', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Vyond Note</label>
              <textarea rows={2} style={inputStyle} value={data.vyond_note || ''} onChange={e => handleChange('vyond_note', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Articulate Note</label>
              <textarea rows={2} style={inputStyle} value={data.articulate_note || ''} onChange={e => handleChange('articulate_note', e.target.value)} />
            </div>
          </div>

          {/* Quiz section if applicable */}
          {data.screen_type === 'knowledge_check' && (
            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #eee', paddingTop: '0.75rem' }}>
              <p style={{ ...labelStyle, color: '#FF7900', marginBottom: '0.5rem' }}>Quiz Data</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={labelStyle}>Question (EN)</label>
                  <textarea rows={2} style={inputStyle}
                    value={data.quiz?.question_en || ''}
                    onChange={e => handleChange('quiz', { ...data.quiz, question_en: e.target.value })}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Question (FR)</label>
                  <textarea rows={2} style={inputStyle}
                    value={data.quiz?.question_fr || ''}
                    onChange={e => handleChange('quiz', { ...data.quiz, question_fr: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save */}
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : 'Save Screen'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
