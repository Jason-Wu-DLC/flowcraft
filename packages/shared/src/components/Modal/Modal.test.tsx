// packages/shared/src/components/Modal/Modal.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../themes/context';
import Modal from './Modal';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Modal', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // 创建一个模拟的 portal 容器
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    // 清理 DOM
    document.body.innerHTML = '';
  });

  it('renders when isOpen is true', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    renderWithTheme(
      <Modal isOpen={false} onClose={jest.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    const closeButton = screen.getByLabelText('关闭');
    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', async () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    const overlay = document.querySelector('.overlay');
    if (overlay) {
      await user.click(overlay);
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });

  it('does not close when overlay is clicked if closeOnOverlayClick is false', async () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={handleClose}
        closeOnOverlayClick={false}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    const overlay = document.querySelector('.overlay');
    if (overlay) {
      await user.click(overlay);
      expect(handleClose).not.toHaveBeenCalled();
    }
  });

  it('calls onClose when ESC key is pressed', async () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when ESC is pressed if closeOnEscape is false', () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={handleClose}
        closeOnEscape={false}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('hides close button when showCloseButton is false', () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        showCloseButton={false}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByLabelText('关闭')).not.toBeInTheDocument();
  });

  it('applies correct size class', () => {
    renderWithTheme(
      <Modal isOpen={true} onClose={jest.fn()} size="lg" title="Test Modal">
        <p>Modal content</p>
      </Modal>
    );

    const modal = document.querySelector('.modal');
    expect(modal).toHaveClass('modal--lg');
  });

  it('renders footer with default buttons when showFooter is true', () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        showFooter
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText('确认')).toBeInTheDocument();
    expect(screen.getByText('取消')).toBeInTheDocument();
  });

  it('renders custom footer', () => {
    const customFooter = <div>Custom footer content</div>;
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        footer={customFooter}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText('Custom footer content')).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const handleConfirm = jest.fn();
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        showFooter
        onConfirm={handleConfirm}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    const confirmButton = screen.getByText('确认');
    await user.click(confirmButton);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const handleCancel = jest.fn();
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        showFooter
        onCancel={handleCancel}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    const cancelButton = screen.getByText('取消');
    await user.click(cancelButton);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it('shows loading state on confirm button', () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        showFooter
        confirmLoading={true}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    const confirmButton = screen.getByText('确认');
    expect(confirmButton).toBeDisabled();
  });

  it('uses custom confirm and cancel text', () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        showFooter
        confirmText="保存"
        cancelText="放弃"
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText('保存')).toBeInTheDocument();
    expect(screen.getByText('放弃')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        className="custom-modal"
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    const modal = document.querySelector('.modal');
    expect(modal).toHaveClass('custom-modal');
  });

  it('applies custom zIndex', () => {
    renderWithTheme(
      <Modal
        isOpen={true}
        onClose={jest.fn()}
        zIndex={2000}
        title="Test Modal"
      >
        <p>Modal content</p>
      </Modal>
    );

    const overlay = document.querySelector('.overlay');
    expect(overlay).toHaveStyle('z-index: 2000');
  });
});
