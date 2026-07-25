import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ErrorFallback from './ErrorFallback'

describe('ErrorFallback', () => {
  it('renders an accessible default message and retry action', () => {
    render(<ErrorFallback error={new Error('Request failed')} onRetry={vi.fn()} />)

    expect(screen.getByRole('alert', { name: 'Something went wrong' })).toBeInTheDocument()
    expect(screen.getByText('We could not display this part of the application. Please try again.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })

  it('invokes retry and reveals technical details on request', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()

    render(<ErrorFallback error={new Error('Request failed')} onRetry={onRetry} />)

    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(onRetry).toHaveBeenCalledTimes(1)

    await user.click(screen.getByText('Technical details'))
    expect(screen.getByText('Request failed')).toBeVisible()
  })
})
