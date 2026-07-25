import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import KeyboardShortcutsModal, { type KeyboardShortcutDisplay } from './KeyboardShortcutsModal'

const shortcuts: KeyboardShortcutDisplay[] = [
  { keys: ['/'], description: 'Focus search' },
  { keys: ['Ctrl', 'Shift', 'E'], description: 'Export CSV' },
]

function ShortcutModalHarness() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open shortcuts</button>
      <KeyboardShortcutsModal open={open} onClose={() => setOpen(false)} shortcuts={shortcuts} />
    </>
  )
}

describe('KeyboardShortcutsModal', () => {
  it('opens and renders the shortcut list', () => {
    render(<KeyboardShortcutsModal open onClose={vi.fn()} shortcuts={shortcuts} />)

    expect(screen.getByRole('dialog', { name: 'Keyboard shortcuts' })).toBeInTheDocument()
    expect(screen.getByText('Focus search')).toBeInTheDocument()
    expect(screen.getByText('Export CSV')).toBeInTheDocument()
    expect(screen.getByText('Ctrl')).toBeInTheDocument()
  })

  it('closes on Escape and restores focus', async () => {
    const user = userEvent.setup()
    render(<ShortcutModalHarness />)
    const trigger = screen.getByRole('button', { name: 'Open shortcuts' })
    await user.click(trigger)

    await waitFor(() => expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus())
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('closes on backdrop click and traps focus within the dialog', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<KeyboardShortcutsModal open onClose={onClose} shortcuts={shortcuts} />)

    const closeButton = screen.getByRole('button', { name: 'Close' })
    await waitFor(() => expect(closeButton).toHaveFocus())
    await user.tab()
    expect(closeButton).toHaveFocus()

    await user.click(screen.getByRole('presentation'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
