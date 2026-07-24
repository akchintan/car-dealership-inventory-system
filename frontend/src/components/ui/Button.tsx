import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Spinner from './Spinner'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode
  variant?: ButtonVariant
  loading?: boolean
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, Record<string, string | number>> = {
  primary: {
    color: '#ffffff',
    background: '#c2410c',
    border: '1px solid #c2410c',
  },
  secondary: {
    color: '#344054',
    background: '#ffffff',
    border: '1px solid #cbd5e1',
  },
  danger: {
    color: '#b42318',
    background: '#ffffff',
    border: '1px solid #fecdca',
  },
}

function Button({
  children,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  disabled = false,
  style,
  ...buttonProps
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      {...buttonProps}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: fullWidth ? '100%' : undefined,
        padding: '10px 14px',
        borderRadius: '8px',
        cursor: isDisabled ? 'wait' : 'pointer',
        font: 'inherit',
        fontWeight: 700,
        opacity: isDisabled && !loading ? 0.65 : 1,
        ...variantStyles[variant],
        ...style,
      }}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}

export default Button
