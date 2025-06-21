// packages/shared/src/components/Input/Input.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../themes/context';
import Input from './Input';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Input', () => {
  const user = userEvent.setup();

  it('renders correctly', () => {
    renderWithTheme(<Input placeholder="Test input" />);
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  it('renders with label', () => {
    renderWithTheme(<Input label="Username" placeholder="Enter username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    renderWithTheme(<Input label="Email" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('handles value changes', async () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Input placeholder="Type here" onChange={handleChange} />
    );

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('test');
  });

  it('applies size classes correctly', () => {
    renderWithTheme(<Input size="lg" data-testid="input-lg" />);
    const input = screen.getByTestId('input-lg');
    expect(input).toHaveClass('input--lg');
  });

  it('shows error message', () => {
    renderWithTheme(
      <Input
        label="Email"
        errorMessage="Invalid email format"
        placeholder="Enter email"
      />
    );

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toHaveClass('input');
  });

  it('shows success message', () => {
    renderWithTheme(
      <Input
        label="Email"
        successMessage="Email is valid"
        placeholder="Enter email"
      />
    );

    expect(screen.getByText('Email is valid')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    renderWithTheme(
      <Input
        label="Password"
        helperText="Password must be at least 8 characters"
      />
    );

    expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    renderWithTheme(<Input disabled placeholder="Disabled input" />);
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  });

  it('handles readonly state', () => {
    renderWithTheme(<Input readOnly placeholder="Readonly input" />);
    const input = screen.getByPlaceholderText('Readonly input');
    expect(input).toHaveAttribute('readonly');
  });

  it('shows character count', () => {
    renderWithTheme(
      <Input
        placeholder="Type here"
        maxLength={100}
        showCount
        defaultValue="Hello"
      />
    );

    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  it('handles password toggle', async () => {
    renderWithTheme(<Input type="password" placeholder="Enter password" />);

    const input = screen.getByPlaceholderText('Enter password');
    const toggleButton = screen.getByRole('button');

    expect(input).toHaveAttribute('type', 'password');

    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('handles clear functionality', async () => {
    const handleClear = jest.fn();
    renderWithTheme(
      <Input
        placeholder="Clearable input"
        clearable
        defaultValue="Clear me"
        onClear={handleClear}
      />
    );

    const clearButton = screen.getByText('×');
    await user.click(clearButton);

    expect(handleClear).toHaveBeenCalled();
  });

  it('renders left and right icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">L</span>;
    const RightIcon = () => <span data-testid="right-icon">R</span>;

    renderWithTheme(
      <Input
        placeholder="With icons"
        leftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
      />
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('renders left and right addons', () => {
    renderWithTheme(
      <Input
        placeholder="domain"
        leftAddon="https://"
        rightAddon=".com"
      />
    );

    expect(screen.getByText('https://')).toBeInTheDocument();
    expect(screen.getByText('.com')).toBeInTheDocument();
  });

  it('handles focus and blur events', async () => {
    renderWithTheme(<Input placeholder="Focus test" />);

    const input = screen.getByPlaceholderText('Focus test');

    await user.click(input);
    // Focus styles are handled by CSS classes, we can test the input focus state
    expect(input).toHaveFocus();

    await user.tab();
    expect(input).not.toHaveFocus();
  });

  it('prevents input when maxLength is reached', async () => {
    renderWithTheme(<Input placeholder="Max length test" maxLength={5} />);

    const input = screen.getByPlaceholderText('Max length test');
    await user.type(input, '123456789');

    expect(input).toHaveValue('12345');
  });

  it('shows error state for character count overflow', () => {
    renderWithTheme(
      <Input
        placeholder="Count test"
        maxLength={10}
        showCount
        defaultValue="This is too long"
      />
    );

    // The count should show as error when over limit
    const countElement = screen.getByText('16/10');
    expect(countElement).toBeInTheDocument();
  });

  it('handles different input types', () => {
    const { rerender } = renderWithTheme(
      <Input type="email" placeholder="Email input" />
    );

    let input = screen.getByPlaceholderText('Email input');
    expect(input).toHaveAttribute('type', 'email');

    rerender(
      <ThemeProvider>
        <Input type="number" placeholder="Number input" />
      </ThemeProvider>
    );

    input = screen.getByPlaceholderText('Number input');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('applies custom className', () => {
    renderWithTheme(
      <Input placeholder="Custom class" className="custom-input" />
    );

    // The className is applied to the container wrapper
    const wrapper = screen.getByPlaceholderText('Custom class').closest('.wrapper');
    expect(wrapper).toHaveClass('custom-input');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    renderWithTheme(<Input ref={ref} placeholder="Ref test" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.placeholder).toBe('Ref test');
  });
});