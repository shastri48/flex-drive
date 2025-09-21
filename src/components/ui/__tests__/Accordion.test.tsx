import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Accordion from '../Accordion'

describe('Accordion', () => {
  it('renders correctly with title', () => {
    render(
      <Accordion title="Test Filter">
        <div>Filter content</div>
      </Accordion>
    )

    expect(screen.getByText('Test Filter')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /test filter/i })
    ).toBeInTheDocument()
  })

  it('shows content when expanded by default', () => {
    render(
      <Accordion title="Test Filter" isExpanded={true}>
        <div>Filter content</div>
      </Accordion>
    )

    expect(screen.getByText('Filter content')).toBeInTheDocument()
  })

  it('hides content when collapsed by default', () => {
    render(
      <Accordion title="Test Filter" isExpanded={false}>
        <div>Filter content</div>
      </Accordion>
    )

    expect(screen.queryByText('Filter content')).not.toBeInTheDocument()
  })

  it('toggles content visibility when clicked', async () => {
    const user = userEvent.setup()
    render(
      <Accordion title="Test Filter" isExpanded={false}>
        <div>Filter content</div>
      </Accordion>
    )

    // Initially hidden
    expect(screen.queryByText('Filter content')).not.toBeInTheDocument()

    // Click to expand
    await user.click(screen.getByRole('button', { name: /test filter/i }))
    expect(screen.getByText('Filter content')).toBeInTheDocument()

    // Click to collapse
    await user.click(screen.getByRole('button', { name: /test filter/i }))
    expect(screen.queryByText('Filter content')).not.toBeInTheDocument()
  })

  it('shows chevron icon in correct direction', async () => {
    const user = userEvent.setup()
    render(
      <Accordion title="Test Filter" isExpanded={false}>
        <div>Filter content</div>
      </Accordion>
    )

    const button = screen.getByRole('button', { name: /test filter/i })
    const chevron = button.querySelector('svg')

    // Initially not rotated (collapsed)
    expect(chevron).not.toHaveClass('rotate-180')

    // Click to expand
    await user.click(button)
    expect(chevron).toHaveClass('rotate-180')

    // Click to collapse
    await user.click(button)
    expect(chevron).not.toHaveClass('rotate-180')
  })

  it('renders children correctly', () => {
    render(
      <Accordion title="Test Filter" isExpanded={true}>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Accordion>
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    render(
      <Accordion title="Test Filter">
        <div>Content</div>
      </Accordion>
    )

    const container = screen.getByText('Test Filter').closest('div')
    expect(container).toHaveClass('p-4')

    const button = screen.getByRole('button', { name: /test filter/i })
    expect(button).toHaveClass(
      'flex',
      'items-center',
      'justify-between',
      'w-full',
      'text-left'
    )
  })

  it('maintains state independently for multiple instances', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <Accordion title="Filter 1" isExpanded={false}>
          <div>Content 1</div>
        </Accordion>
        <Accordion title="Filter 2" isExpanded={false}>
          <div>Content 2</div>
        </Accordion>
      </div>
    )

    // Both initially collapsed
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()

    // Expand first filter
    await user.click(screen.getByRole('button', { name: /filter 1/i }))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()

    // Expand second filter
    await user.click(screen.getByRole('button', { name: /filter 2/i }))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('handles complex children correctly', () => {
    render(
      <Accordion title="Complex Filter" isExpanded={true}>
        <div>
          <input type="checkbox" id="option1" />
          <label htmlFor="option1">Option 1</label>
        </div>
        <div>
          <input type="checkbox" id="option2" />
          <label htmlFor="option2">Option 2</label>
        </div>
      </Accordion>
    )

    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  })
})
