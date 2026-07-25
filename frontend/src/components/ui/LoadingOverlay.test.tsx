import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LoadingOverlay from './LoadingOverlay'

describe('LoadingOverlay', () => {
  it('is hidden when inactive', () => {
    render(<LoadingOverlay open={false} />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows a blocking status overlay with its default message and spinner', () => {
    render(<LoadingOverlay open />)

    const overlay = screen.getByRole('status')
    expect(overlay).toHaveTextContent('Loading...')
    expect(overlay).toHaveStyle({ position: 'fixed', inset: '0' })
    expect(overlay.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('displays an optional loading message', () => {
    render(<LoadingOverlay open message="Saving vehicle..." />)

    expect(screen.getByRole('status')).toHaveTextContent('Saving vehicle...')
  })
})
