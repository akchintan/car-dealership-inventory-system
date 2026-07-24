import { type KeyboardEvent, useEffect, useRef } from 'react'
import Button from './Button'
import Card from './Card'

interface ConfirmationModalProps {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  cancelLabel: string
  loading: boolean
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmationModal({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  loading,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return undefined

    previouslyFocusedElementRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null

    const focusTimer = window.setTimeout(() => {
      const firstButton = dialogRef.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')
      ;(firstButton ?? dialogRef.current)?.focus()
    }, 0)

    return () => {
      window.clearTimeout(focusTimer)
      previouslyFocusedElementRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (open && loading) {
      dialogRef.current?.focus()
    }
  }, [open, loading])

  if (!open) return null

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && !loading) {
      event.preventDefault()
      onCancel()
      return
    }

    if (event.key !== 'Tab') return

    const focusableElements = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    )

    if (focusableElements.length === 0) {
      event.preventDefault()
      dialogRef.current?.focus()
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (!loading && event.target === event.currentTarget) onCancel()
      }}
      style={{
        position: 'fixed',
        zIndex: 1100,
        inset: 0,
        display: 'grid',
        padding: '24px',
        background: 'rgb(15 23 42 / 48%)',
        placeItems: 'center',
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-message"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        style={{ width: 'min(100%, 460px)', outline: 'none' }}
      >
        <Card>
          <h2 id="confirmation-modal-title" style={{ margin: 0, color: '#172033', fontSize: '1.25rem' }}>
            {title}
          </h2>
          <p id="confirmation-modal-message" style={{ margin: '12px 0 24px', color: '#667085', lineHeight: 1.5 }}>
            {message}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap-reverse', justifyContent: 'flex-end', gap: '10px' }}>
            <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
              {cancelLabel}
            </Button>
            <Button type="button" variant="danger" onClick={onConfirm} loading={loading} disabled={loading}>
              {confirmLabel}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ConfirmationModal
