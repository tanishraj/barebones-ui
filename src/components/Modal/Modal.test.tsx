import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Modal } from './Modal';

describe('Modal Component', () => {
  it('renders the modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} position='center' size='md'>
        <p>Modal Content</p>
      </Modal>,
    );

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass('modal');
  });

  it('calls onOpen when the modal opens', () => {
    const handleOpen = vi.fn();
    render(
      <Modal isOpen={true} onOpen={handleOpen}>
        <p>Modal Content</p>
      </Modal>,
    );

    expect(handleOpen).toHaveBeenCalled();
  });

  it('calls onClose when the modal closes', () => {
    const handleClose = vi.fn();
    const { rerender } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Modal Content</p>
      </Modal>,
    );

    rerender(
      <Modal isOpen={false} onClose={handleClose}>
        <p>Modal Content</p>
      </Modal>,
    );

    expect(handleClose).toHaveBeenCalled();
  });

  it('renders with a close button when closeButton is true', () => {
    render(
      <Modal isOpen={true} closeButton>
        <p>Modal Content</p>
      </Modal>,
    );

    const closeButton = screen.getByText('✕');
    expect(closeButton).toBeInTheDocument();
  });

  it('renders footer content if provided', () => {
    render(
      <Modal isOpen={true} footer={<button>Custom Footer Button</button>}>
        <p>Modal Content</p>
      </Modal>,
    );

    const footerButton = screen.getByText('Custom Footer Button');
    expect(footerButton).toBeInTheDocument();
  });

  it('closes modal on backdrop click when closeOnBackdropClick is true', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} closeOnBackdropClick onClose={handleClose}>
        <p>Modal Content</p>
      </Modal>,
    );

    const backdrop = screen.getByText('Close');
    fireEvent.click(backdrop);
    expect(handleClose).toHaveBeenCalled();
  });

  it('applies size and position classes', () => {
    render(
      <Modal isOpen={true} size='lg' position='top'>
        <p>Modal Content</p>
      </Modal>,
    );

    const modalBox = screen.getByRole('dialog').querySelector('.modal-box');
    expect(modalBox).toHaveClass('w-8/12 max-w-4xl');
    expect(modalBox).toHaveClass('modal-top');
  });
});
