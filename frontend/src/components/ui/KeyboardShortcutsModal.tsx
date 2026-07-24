import { type KeyboardEvent, useEffect, useRef } from 'react'
import Button from './Button'
import Card from './Card'

export interface KeyboardShortcutDisplay {
  keys: readonly string[]
  description: string
}

interface KeyboardShortcutsModalProps {
  open: boolean
  onClose: () => void
  shortcuts: readonly KeyboardShortcutDisplay[]
}

function KeyboardShortcutsModal({ open, onClose, shortcuts }: KeyboardShortcutsModalProps) {
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

  if (!open) return null

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
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
        if (event.target === event.currentTarget) onClose()
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
        aria-labelledby="keyboard-shortcuts-title"
        aria-describedby="keyboard-shortcuts-description"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        style={{ width: 'min(100%, 520px)', outline: 'none' }}
      >
        <Card>
          <h2 id="keyboard-shortcuts-title" style={{ margin: 0, color: '#172033', fontSize: '1.25rem' }}>
            Keyboard shortcuts
          </h2>
          <p id="keyboard-shortcuts-description" style={{ margin: '12px 0 20px', color: '#667085', lineHeight: 1.5 }}>
            Use these shortcuts to work with the current page more quickly.
          </p>
          <dl style={{ display: 'grid', gap: '12px', margin: '0 0 24px' }}>
            {shortcuts.map((shortcut) => (
              <div key={`${shortcut.keys.join('-')}-${shortcut.description}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                <dt style={{ color: '#475467' }}>{shortcut.description}</dt>
                <dd style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '4px', margin: 0 }}>
                  {shortcut.keys.map((key) => (
                    <kbd key={key} style={{ padding: '4px 7px', color: '#344054', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '5px', fontFamily: 'inherit', fontSize: '0.82rem', fontWeight: 700 }}>
                      {key}
                    </kbd>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={onClose}>Close</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default KeyboardShortcutsModal
