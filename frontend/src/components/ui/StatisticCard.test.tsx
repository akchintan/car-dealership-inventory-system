import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import StatisticCard, { StatisticCardSkeleton } from './StatisticCard'

describe('StatisticCard', () => {
  it('renders its title and value', () => {
    render(<StatisticCard title="Total cars" value={24} description="In inventory" />)

    expect(screen.getByText('Total cars')).toBeInTheDocument()
    expect(screen.getByText('24')).toBeInTheDocument()
    expect(screen.getByText('In inventory')).toBeInTheDocument()
  })

  it('renders an optional icon', () => {
    render(<StatisticCard title="Available" value={10} icon={<span>Car icon</span>} />)

    expect(screen.getByText('Car icon')).toBeInTheDocument()
  })

  it.each(['default', 'success', 'warning', 'danger'] as const)(
    'renders the %s variant',
    (variant) => {
      render(<StatisticCard title={`${variant} cars`} value={1} variant={variant} />)

      expect(screen.getByText(`${variant} cars`)).toBeInTheDocument()
    },
  )

  it('renders the loading skeleton without announcing content', () => {
    const { container } = render(<StatisticCardSkeleton />)

    expect(container.querySelector('.statistic-card-skeleton')).toHaveAttribute('aria-hidden', 'true')
  })
})
