import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import StatusBadge from './StatusBadge'

describe('StatusBadge', () => {
  it.each([
    ['available', 'available'],
    ['sold', 'sold'],
    ['reserved', 'reserved'],
    ['pending', 'pending'],
  ])('renders the %s status', (status, expectedText) => {
    render(<StatusBadge status={status} />)

    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
})
