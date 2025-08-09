import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Drawer, DrawerToggle } from './Drawer';

describe('Drawer', () => {
  it('renders without crashing', () => {
    render(
      <Drawer id='test-drawer'>
        <div>Main Content</div>
      </Drawer>,
    );
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });

  it('renders with side content', () => {
    render(
      <Drawer id='test-drawer' sideContent={<div>Sidebar Content</div>}>
        <div>Main Content</div>
      </Drawer>,
    );
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Sidebar Content')).toBeInTheDocument();
  });

  it('applies default left position', () => {
    const { container } = render(
      <Drawer id='test-drawer'>
        <div>Content</div>
      </Drawer>,
    );
    const drawer = container.querySelector('.drawer');
    expect(drawer).toHaveClass('drawer');
    expect(drawer).not.toHaveClass('drawer-end');
  });

  it('applies right position when specified', () => {
    const { container } = render(
      <Drawer id='test-drawer' position='right'>
        <div>Content</div>
      </Drawer>,
    );
    const drawer = container.querySelector('.drawer');
    expect(drawer).toHaveClass('drawer-end');
  });

  it('applies responsive classes correctly', () => {
    const { container, rerender } = render(
      <Drawer id='test-drawer' responsive='lg'>
        <div>Content</div>
      </Drawer>,
    );
    let drawer = container.querySelector('.drawer');
    expect(drawer).toHaveClass('lg:drawer-open');

    rerender(
      <Drawer id='test-drawer' responsive='md'>
        <div>Content</div>
      </Drawer>,
    );
    drawer = container.querySelector('.drawer');
    expect(drawer).toHaveClass('md:drawer-open');

    rerender(
      <Drawer id='test-drawer' responsive='sm'>
        <div>Content</div>
      </Drawer>,
    );
    drawer = container.querySelector('.drawer');
    expect(drawer).toHaveClass('sm:drawer-open');
  });

  it('renders checkbox with correct id', () => {
    render(
      <Drawer id='test-drawer'>
        <div>Content</div>
      </Drawer>,
    );
    const checkbox = document.getElementById('test-drawer') as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.type).toBe('checkbox');
    expect(checkbox).toHaveClass('drawer-toggle');
  });

  it('handles controlled open state', () => {
    const { rerender } = render(
      <Drawer id='test-drawer' open={false}>
        <div>Content</div>
      </Drawer>,
    );
    let checkbox = document.getElementById('test-drawer') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    rerender(
      <Drawer id='test-drawer' open={true}>
        <div>Content</div>
      </Drawer>,
    );
    checkbox = document.getElementById('test-drawer') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('calls onOpenChange when checkbox is toggled', () => {
    const handleOpenChange = vi.fn();
    render(
      <Drawer id='test-drawer' onOpenChange={handleOpenChange}>
        <div>Content</div>
      </Drawer>,
    );

    const checkbox = document.getElementById('test-drawer') as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(handleOpenChange).toHaveBeenCalledWith(true);

    fireEvent.click(checkbox);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('applies custom classNames', () => {
    const { container } = render(
      <Drawer
        id='test-drawer'
        className='custom-drawer'
        contentClassName='custom-content'
        sideClassName='custom-side'
        overlayClassName='custom-overlay'
      >
        <div>Content</div>
      </Drawer>,
    );

    const drawer = container.querySelector('.drawer');
    const drawerContent = container.querySelector('.drawer-content');
    const drawerSide = container.querySelector('.drawer-side');
    const drawerOverlay = container.querySelector('.drawer-overlay');

    expect(drawer).toHaveClass('custom-drawer');
    expect(drawerContent).toHaveClass('custom-content');
    expect(drawerSide).toHaveClass('custom-side');
    expect(drawerOverlay).toHaveClass('custom-overlay');
  });

  it('applies custom side width', () => {
    const { container } = render(
      <Drawer id='test-drawer' sideWidth='w-96' sideContent={<div>Side</div>}>
        <div>Content</div>
      </Drawer>,
    );

    const sideMenu = container.querySelector('.menu');
    expect(sideMenu).toHaveClass('w-96');
  });

  it('renders DrawerToggle correctly', () => {
    render(
      <>
        <Drawer id='test-drawer'>
          <div>Content</div>
        </Drawer>
        <DrawerToggle drawerId='test-drawer'>
          <button>Open Drawer</button>
        </DrawerToggle>
      </>,
    );

    const toggle = screen.getByText('Open Drawer').parentElement;
    expect(toggle).toHaveClass('drawer-button');
    expect(toggle?.getAttribute('for')).toBe('test-drawer');
  });

  it('DrawerToggle applies custom className', () => {
    render(
      <DrawerToggle drawerId='test-drawer' className='custom-toggle'>
        <button>Toggle</button>
      </DrawerToggle>,
    );

    const toggle = screen.getByText('Toggle').parentElement;
    expect(toggle).toHaveClass('drawer-button');
    expect(toggle).toHaveClass('custom-toggle');
  });

  it('clicking overlay closes drawer', () => {
    const handleOpenChange = vi.fn();
    const { container } = render(
      <Drawer id='test-drawer' open={true} onOpenChange={handleOpenChange}>
        <div>Content</div>
      </Drawer>,
    );

    const overlay = container.querySelector(
      '.drawer-overlay',
    ) as HTMLLabelElement;
    expect(overlay).toBeInTheDocument();
    expect(overlay.getAttribute('for')).toBe('test-drawer');
    expect(overlay.getAttribute('aria-label')).toBe('Close drawer');
  });

  it('maintains proper structure with all props', () => {
    const { container } = render(
      <Drawer
        id='test-drawer'
        position='right'
        responsive='lg'
        open={true}
        className='custom'
        sideContent={<nav>Navigation</nav>}
      >
        <main>Main Content</main>
      </Drawer>,
    );

    const drawer = container.firstChild as HTMLElement;
    expect(drawer.tagName).toBe('DIV');
    expect(drawer).toHaveClass('drawer');
    expect(drawer).toHaveClass('drawer-end');
    expect(drawer).toHaveClass('lg:drawer-open');
    expect(drawer).toHaveClass('custom');

    const checkbox = drawer.querySelector('input[type="checkbox"]');
    expect(checkbox).toHaveClass('drawer-toggle');

    const content = drawer.querySelector('.drawer-content');
    expect(content).toBeInTheDocument();

    const side = drawer.querySelector('.drawer-side');
    expect(side).toBeInTheDocument();
  });
});
