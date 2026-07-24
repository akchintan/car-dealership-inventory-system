interface StatusBadgeProps {
  status: string
}

const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 10px',
  borderRadius: '999px',
  fontSize: '0.8rem',
  fontWeight: 700,
  textTransform: 'capitalize' as const,
}

const statusStyles: Record<string, { background: string; color: string }> = {
  available: { background: '#ecfdf3', color: '#027a48' },
  sold: { background: '#fef3f2', color: '#b42318' },
  reserved: { background: '#fffaeb', color: '#b54708' },
}

function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase()
  const statusStyle = statusStyles[normalizedStatus]
  const displayStatus = statusStyle ? normalizedStatus : status

  return (
    <span style={{ ...baseStyle, ...(statusStyle ?? { background: '#f2f4f7', color: '#475467' }) }}>
      {displayStatus}
    </span>
  )
}

export default StatusBadge
