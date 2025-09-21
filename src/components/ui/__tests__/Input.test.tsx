import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../Input'

describe('Input', () => {
  it('renders correctly with default props', () => {
    render(<Input />)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('block', 'w-full', 'border', 'border-gray-300')
  })

  it('renders with label when provided', () => {
    render(<Input label="Email Address" />)

    expect(screen.getByText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
  })

  it('displays error message when provided', () => {
    render(<Input error="This field is required" />)

    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('border-red-300')
  })

  it('renders left icon when provided', () => {
    const LeftIcon = <span data-testid="left-icon">🔍</span>
    render(<Input leftIcon={LeftIcon} />)

    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('pl-10')
  })

  it('renders right icon when provided', () => {
    const RightIcon = <span data-testid="right-icon">✓</span>
    render(<Input rightIcon={RightIcon} />)

    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('pr-10')
  })

  it('renders both left and right icons', () => {
    const LeftIcon = <span data-testid="left-icon">🔍</span>
    const RightIcon = <span data-testid="right-icon">✓</span>
    render(<Input leftIcon={LeftIcon} rightIcon={RightIcon} />)

    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('pl-10', 'pr-10')
  })

  it('handles user input correctly', async () => {
    const handleChange = jest.fn()
    const user = userEvent.setup()

    render(<Input onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'test input')

    expect(input).toHaveValue('test input')
    expect(handleChange).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" />)

    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  it('forwards other props to input element', () => {
    render(
      <Input placeholder="Enter text" type="email" data-testid="email-input" />
    )

    const input = screen.getByTestId('email-input')
    expect(input).toHaveAttribute('placeholder', 'Enter text')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />)

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass(
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    )
  })

  it('shows error styling when error is provided', () => {
    render(<Input error="Invalid input" />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass(
      'border-red-300',
      'focus:ring-red-500',
      'focus:border-red-500'
    )
  })

  it('shows normal styling when no error', () => {
    render(<Input />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveClass(
      'border-gray-300',
      'focus:ring-blue-500',
      'focus:border-blue-500'
    )
  })

  it('applies correct padding based on icons', () => {
    const { rerender } = render(<Input />)
    expect(screen.getByRole('textbox')).toHaveClass('px-3', 'py-2')

    const LeftIcon = <span>🔍</span>
    rerender(<Input leftIcon={LeftIcon} />)
    expect(screen.getByRole('textbox')).toHaveClass('pl-10', 'pr-3', 'py-2')

    const RightIcon = <span>✓</span>
    rerender(<Input rightIcon={RightIcon} />)
    expect(screen.getByRole('textbox')).toHaveClass('pl-3', 'pr-10', 'py-2')

    rerender(<Input leftIcon={LeftIcon} rightIcon={RightIcon} />)
    expect(screen.getByRole('textbox')).toHaveClass('pl-10', 'pr-10', 'py-2')
  })

  it('associates label with input correctly', () => {
    render(<Input label="Username" />)

    const input = screen.getByRole('textbox')
    const label = screen.getByText('Username')

    expect(input).toHaveAccessibleName('Username')
    expect(label).toBeInTheDocument()
  })

  it('renders without label when not provided', () => {
    render(<Input />)

    expect(screen.queryByText(/label/i)).not.toBeInTheDocument()
  })

  it('renders without error when not provided', () => {
    render(<Input />)

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument()
  })
})
