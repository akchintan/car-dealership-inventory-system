import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
  icon?: ReactNode
}

function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div>
      {icon && <div style={{ marginBottom: '12px' }}>{icon}</div>}
      <h2 style={{ margin: '0 0 8px', color: '#172033', fontSize: '1.15rem' }}>{title}</h2>
      <p style={{ margin: action ? '0 0 20px' : 0, color: '#667085', lineHeight: 1.5 }}>{description}</p>
      {action}
    </div>
  )
}

export default EmptyState
