import { useRef, useState } from 'react'

export default function UploadZone({ onFile }) {
  const [dragging, setDragging] = useState(false)
  const [filename, setFilename] = useState(null)
  const inputRef = useRef()

  const handleFile = (file) => {
    if (!file) return
    setFilename(file.name)
    onFile(file)
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => {
        e.preventDefault()
        setDragging(false)
        handleFile(e.dataTransfer.files[0])
      }}
      style={{
        border: `2px dashed ${dragging ? '#FF7900' : '#888'}`,
        padding: '2rem',
        textAlign: 'center',
        cursor: 'pointer',
        background: dragging ? 'rgba(255,121,0,0.04)' : '#fafafa',
        transition: 'all 0.15s',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.doc,.pptx,.ppt,.txt"
        style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])}
      />
      {filename ? (
        <p style={{ margin: 0, fontWeight: 600 }}>{filename}</p>
      ) : (
        <>
          <p style={{ margin: 0, fontWeight: 600, color: '#000' }}>Drop file here or click to browse</p>
          <p style={{ margin: '0.4rem 0 0', color: '#888', fontSize: '0.82rem' }}>
            Supports: PDF, DOCX, PPTX, TXT
          </p>
        </>
      )}
    </div>
  )
}
