const STATUS_STYLES = {
  draft: { background: '#888', color: '#fff' },
  in_review: { background: '#000', color: '#fff' },
  approved: { background: '#FF7900', color: '#fff' },
  exported: { background: '#fff', color: '#000', border: '1.5px solid #888' },
}

export default function Badge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.draft
  return (
    <span
      style={{
        ...style,
        padding: '0.2rem 0.65rem',
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        borderRadius: 0,
        display: 'inline-block',
        border: style.border || 'none',
      }}
    >
      {status?.replace('_', ' ')}
    </span>
  )
}
