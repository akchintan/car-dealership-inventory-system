import type { ReactNode } from 'react'
import Card from './Card'

export type StatisticCardVariant = 'default' | 'success' | 'warning' | 'danger'

interface StatisticCardProps {
  title: string
  value: ReactNode
  description?: ReactNode
  icon?: ReactNode
  variant?: StatisticCardVariant
}

const variantStyles: Record<StatisticCardVariant, { background: string; borderColor: string; iconBackground: string; iconColor: string }> = {
  default: { background: '#ffffff', borderColor: '#e4e9f0', iconBackground: '#eff6ff', iconColor: '#175cd3' },
  success: { background: '#f6fef9', borderColor: '#abefc6', iconBackground: '#ecfdf3', iconColor: '#027a48' },
  warning: { background: '#fffcf5', borderColor: '#fedf89', iconBackground: '#fffaeb', iconColor: '#b54708' },
  danger: { background: '#fffbfa', borderColor: '#fecdca', iconBackground: '#fef3f2', iconColor: '#b42318' },
}

export function StatisticCardSkeleton() {
  return (
    <Card className="statistic-card-skeleton" style={{ minHeight: '122px' }} aria-hidden="true">
      <div className="statistic-card-skeleton__title" />
      <div className="statistic-card-skeleton__value" />
      <div className="statistic-card-skeleton__description" />
    </Card>
  )
}

function StatisticCard({ title, value, description, icon, variant = 'default' }: StatisticCardProps) {
  const style = variantStyles[variant]

  return (
    <Card style={{ minHeight: '122px', background: style.background, borderColor: style.borderColor }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <p style={{ margin: 0, color: '#667085', fontSize: '0.9rem', fontWeight: 650 }}>{title}</p>
        {icon && (
          <span aria-hidden="true" style={{ display: 'inline-grid', width: '32px', height: '32px', placeItems: 'center', color: style.iconColor, background: style.iconBackground, borderRadius: '8px' }}>
            {icon}
          </span>
        )}
      </div>
      <p style={{ margin: '10px 0 0', color: '#172033', fontSize: '1.8rem', fontWeight: 750, letterSpacing: '-0.035em' }}>{value}</p>
      {description && <p style={{ margin: '8px 0 0', color: '#667085', fontSize: '0.85rem' }}>{description}</p>}
    </Card>
  )
}

export default StatisticCard
