import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  children?: ReactNode
  title?: ReactNode
  style?: CSSProperties
}

const baseCardStyle: CSSProperties = {
  padding: '24px',
  background: '#ffffff',
  border: '1px solid #e4e9f0',
  borderRadius: '16px',
  boxShadow: '0 10px 25px rgb(15 23 42 / 7%)',
}

function Card({ children, title, style, ...cardProps }: CardProps) {
  return (
    <div {...cardProps} style={{ ...baseCardStyle, ...style }}>
      {title && <h2 style={{ margin: '0 0 16px', color: '#172033', fontSize: '1.15rem' }}>{title}</h2>}
      {children}
    </div>
  )
}

export default Card
