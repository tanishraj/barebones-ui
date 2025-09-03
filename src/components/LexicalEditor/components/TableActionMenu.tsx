import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Plus,
  Minus,
  Trash2,
  ChevronDown,
  TableProperties,
  Rows,
  Columns,
  Merge,
  Split,
} from 'lucide-react';

interface TableActionMenuProps {
  onInsertRowAbove: () => void;
  onInsertRowBelow: () => void;
  onInsertColumnLeft: () => void;
  onInsertColumnRight: () => void;
  onDeleteRow: () => void;
  onDeleteColumn: () => void;
  onDeleteTable: () => void;
  onMergeCells?: () => void;
  onUnmergeCells?: () => void;
  canMergeCells?: boolean;
  canUnmergeCells?: boolean;
  position: { x: number; y: number } | null;
  onClose: () => void;
}

export default function TableActionMenu({
  onInsertRowAbove,
  onInsertRowBelow,
  onInsertColumnLeft,
  onInsertColumnRight,
  onDeleteRow,
  onDeleteColumn,
  onDeleteTable,
  onMergeCells,
  onUnmergeCells,
  canMergeCells = false,
  canUnmergeCells = false,
  position,
  onClose,
}: TableActionMenuProps): JSX.Element | null {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showRowMenu, setShowRowMenu] = useState(false);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [focusedItemIndex, setFocusedItemIndex] = useState(0);
  const [currentSubmenu, setCurrentSubmenu] = useState<
    'none' | 'row' | 'column'
  >('none');

  // Define menu structure for keyboard navigation
  const menuItems = [
    { type: 'row', label: 'Row' },
    { type: 'column', label: 'Column' },
    ...(canMergeCells && onMergeCells
      ? [{ type: 'merge', label: 'Merge cells', action: onMergeCells }]
      : []),
    ...(canUnmergeCells && onUnmergeCells
      ? [{ type: 'unmerge', label: 'Unmerge cells', action: onUnmergeCells }]
      : []),
    { type: 'delete', label: 'Delete table', action: onDeleteTable },
  ];

  const rowMenuItems = [
    { type: 'insert-above', label: 'Insert above', action: onInsertRowAbove },
    { type: 'insert-below', label: 'Insert below', action: onInsertRowBelow },
    { type: 'delete-row', label: 'Delete row', action: onDeleteRow },
  ];

  const columnMenuItems = [
    { type: 'insert-left', label: 'Insert left', action: onInsertColumnLeft },
    {
      type: 'insert-right',
      label: 'Insert right',
      action: onInsertColumnRight,
    },
    { type: 'delete-column', label: 'Delete column', action: onDeleteColumn },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();

      switch (event.key) {
        case 'Escape':
          if (currentSubmenu !== 'none') {
            setCurrentSubmenu('none');
            setShowRowMenu(false);
            setShowColumnMenu(false);
          } else {
            onClose();
          }
          break;

        case 'ArrowDown':
          if (currentSubmenu === 'row') {
            setFocusedItemIndex(prev => (prev + 1) % rowMenuItems.length);
          } else if (currentSubmenu === 'column') {
            setFocusedItemIndex(prev => (prev + 1) % columnMenuItems.length);
          } else {
            setFocusedItemIndex(prev => (prev + 1) % menuItems.length);
          }
          break;

        case 'ArrowUp':
          if (currentSubmenu === 'row') {
            setFocusedItemIndex(
              prev => (prev - 1 + rowMenuItems.length) % rowMenuItems.length,
            );
          } else if (currentSubmenu === 'column') {
            setFocusedItemIndex(
              prev =>
                (prev - 1 + columnMenuItems.length) % columnMenuItems.length,
            );
          } else {
            setFocusedItemIndex(
              prev => (prev - 1 + menuItems.length) % menuItems.length,
            );
          }
          break;

        case 'ArrowRight':
        case 'Enter':
          if (currentSubmenu === 'none') {
            const focusedItem = menuItems[focusedItemIndex];
            if (focusedItem.type === 'row') {
              setCurrentSubmenu('row');
              setShowRowMenu(true);
              setFocusedItemIndex(0);
            } else if (focusedItem.type === 'column') {
              setCurrentSubmenu('column');
              setShowColumnMenu(true);
              setFocusedItemIndex(0);
            } else if (focusedItem.action) {
              handleAction(focusedItem.action);
            }
          } else if (currentSubmenu === 'row') {
            const focusedRowItem = rowMenuItems[focusedItemIndex];
            if (focusedRowItem.action) {
              handleAction(focusedRowItem.action);
            }
          } else if (currentSubmenu === 'column') {
            const focusedColumnItem = columnMenuItems[focusedItemIndex];
            if (focusedColumnItem.action) {
              handleAction(focusedColumnItem.action);
            }
          }
          break;

        case 'ArrowLeft':
          if (currentSubmenu !== 'none') {
            setCurrentSubmenu('none');
            setShowRowMenu(false);
            setShowColumnMenu(false);
            setFocusedItemIndex(currentSubmenu === 'row' ? 0 : 1);
          }
          break;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    onClose,
    currentSubmenu,
    focusedItemIndex,
    menuItems,
    rowMenuItems,
    columnMenuItems,
  ]);

  // Focus menu when it opens for keyboard navigation
  useEffect(() => {
    if (position && menuRef.current) {
      menuRef.current.focus();
    }
  }, [position]);

  const handleAction = useCallback(
    (action: () => void) => {
      action();
      onClose();
    },
    [onClose],
  );

  // Calculate optimal position to prevent overflow
  const getOptimalPosition = useCallback(() => {
    if (!position) return { left: 0, top: 0 };

    const menuWidth = 200;
    const menuHeight = 300; // Approximate max height
    const padding = 8;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = position.x;
    let top = position.y;

    // Adjust horizontal position
    if (left + menuWidth > viewportWidth - padding) {
      left = position.x - menuWidth;
    }

    // Adjust vertical position
    if (top + menuHeight > viewportHeight - padding) {
      top = position.y - menuHeight;
    }

    // Ensure menu doesn't go off-screen
    left = Math.max(padding, left);
    top = Math.max(padding, top);

    return { left, top };
  }, [position]);

  if (!position) {
    return null;
  }

  const optimalPosition = getOptimalPosition();

  return createPortal(
    <div
      ref={menuRef}
      className='fixed z-50 bg-base-100 rounded-lg shadow-xl border border-base-300 py-1 min-w-[200px] not-prose focus:outline-none'
      style={{
        left: `${optimalPosition.left}px`,
        top: `${optimalPosition.top}px`,
      }}
      tabIndex={-1}
      role='menu'
      aria-label='Table actions'
    >
      {/* Row operations submenu */}
      <div className='relative'>
        <button
          className={`flex items-center justify-between w-full px-3 py-2 text-sm transition-colors ${
            currentSubmenu === 'none' && focusedItemIndex === 0
              ? 'bg-primary text-primary-content'
              : 'hover:bg-base-200'
          }`}
          onMouseEnter={() => {
            setShowRowMenu(true);
            if (currentSubmenu === 'none') setFocusedItemIndex(0);
          }}
          onMouseLeave={() => setShowRowMenu(false)}
          role='menuitem'
          aria-haspopup='true'
          aria-expanded={showRowMenu}
        >
          <span className='flex items-center gap-2'>
            <Rows className='h-4 w-4' />
            Row
          </span>
          <ChevronDown className='h-3 w-3 rotate-[-90deg]' />
        </button>

        {showRowMenu && (
          <div
            className='absolute left-full top-0 ml-1 bg-base-100 rounded-lg shadow-xl border border-base-300 py-1 min-w-[180px]'
            onMouseEnter={() => setShowRowMenu(true)}
            onMouseLeave={() => setShowRowMenu(false)}
            role='menu'
            aria-label='Row actions'
          >
            <button
              onClick={() => handleAction(onInsertRowAbove)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors ${
                currentSubmenu === 'row' && focusedItemIndex === 0
                  ? 'bg-primary text-primary-content'
                  : 'hover:bg-base-200'
              }`}
              role='menuitem'
              onMouseEnter={() => {
                if (currentSubmenu === 'row') setFocusedItemIndex(0);
              }}
            >
              <Plus className='h-4 w-4' />
              Insert above
            </button>
            <button
              onClick={() => handleAction(onInsertRowBelow)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors ${
                currentSubmenu === 'row' && focusedItemIndex === 1
                  ? 'bg-primary text-primary-content'
                  : 'hover:bg-base-200'
              }`}
              role='menuitem'
              onMouseEnter={() => {
                if (currentSubmenu === 'row') setFocusedItemIndex(1);
              }}
            >
              <Plus className='h-4 w-4' />
              Insert below
            </button>
            <div className='divider my-1 mx-2' />
            <button
              onClick={() => handleAction(onDeleteRow)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors text-error ${
                currentSubmenu === 'row' && focusedItemIndex === 2
                  ? 'bg-error text-error-content'
                  : 'hover:bg-base-200'
              }`}
              role='menuitem'
              onMouseEnter={() => {
                if (currentSubmenu === 'row') setFocusedItemIndex(2);
              }}
            >
              <Minus className='h-4 w-4' />
              Delete row
            </button>
          </div>
        )}
      </div>

      {/* Column operations submenu */}
      <div className='relative'>
        <button
          className={`flex items-center justify-between w-full px-3 py-2 text-sm transition-colors ${
            currentSubmenu === 'none' && focusedItemIndex === 1
              ? 'bg-primary text-primary-content'
              : 'hover:bg-base-200'
          }`}
          onMouseEnter={() => {
            setShowColumnMenu(true);
            if (currentSubmenu === 'none') setFocusedItemIndex(1);
          }}
          onMouseLeave={() => setShowColumnMenu(false)}
          role='menuitem'
          aria-haspopup='true'
          aria-expanded={showColumnMenu}
        >
          <span className='flex items-center gap-2'>
            <Columns className='h-4 w-4' />
            Column
          </span>
          <ChevronDown className='h-3 w-3 rotate-[-90deg]' />
        </button>

        {showColumnMenu && (
          <div
            className='absolute left-full top-0 ml-1 bg-base-100 rounded-lg shadow-xl border border-base-300 py-1 min-w-[180px]'
            onMouseEnter={() => setShowColumnMenu(true)}
            onMouseLeave={() => setShowColumnMenu(false)}
            role='menu'
            aria-label='Column actions'
          >
            <button
              onClick={() => handleAction(onInsertColumnLeft)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors ${
                currentSubmenu === 'column' && focusedItemIndex === 0
                  ? 'bg-primary text-primary-content'
                  : 'hover:bg-base-200'
              }`}
              role='menuitem'
              onMouseEnter={() => {
                if (currentSubmenu === 'column') setFocusedItemIndex(0);
              }}
            >
              <Plus className='h-4 w-4' />
              Insert left
            </button>
            <button
              onClick={() => handleAction(onInsertColumnRight)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors ${
                currentSubmenu === 'column' && focusedItemIndex === 1
                  ? 'bg-primary text-primary-content'
                  : 'hover:bg-base-200'
              }`}
              role='menuitem'
              onMouseEnter={() => {
                if (currentSubmenu === 'column') setFocusedItemIndex(1);
              }}
            >
              <Plus className='h-4 w-4' />
              Insert right
            </button>
            <div className='divider my-1 mx-2' />
            <button
              onClick={() => handleAction(onDeleteColumn)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors text-error ${
                currentSubmenu === 'column' && focusedItemIndex === 2
                  ? 'bg-error text-error-content'
                  : 'hover:bg-base-200'
              }`}
              role='menuitem'
              onMouseEnter={() => {
                if (currentSubmenu === 'column') setFocusedItemIndex(2);
              }}
            >
              <Minus className='h-4 w-4' />
              Delete column
            </button>
          </div>
        )}
      </div>

      <div className='divider my-1 mx-2' />

      {/* Merge/Unmerge cells */}
      {(canMergeCells || canUnmergeCells) && (
        <>
          {canMergeCells && onMergeCells && (
            <button
              onClick={() => handleAction(onMergeCells)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors ${
                currentSubmenu === 'none' &&
                focusedItemIndex ===
                  menuItems.findIndex(item => item.type === 'merge')
                  ? 'bg-primary text-primary-content'
                  : 'hover:bg-base-200'
              }`}
              role='menuitem'
              onMouseEnter={() => {
                if (currentSubmenu === 'none') {
                  setFocusedItemIndex(
                    menuItems.findIndex(item => item.type === 'merge'),
                  );
                }
              }}
            >
              <Merge className='h-4 w-4' />
              Merge cells
            </button>
          )}
          {canUnmergeCells && onUnmergeCells && (
            <button
              onClick={() => handleAction(onUnmergeCells)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors ${
                currentSubmenu === 'none' &&
                focusedItemIndex ===
                  menuItems.findIndex(item => item.type === 'unmerge')
                  ? 'bg-primary text-primary-content'
                  : 'hover:bg-base-200'
              }`}
              role='menuitem'
              onMouseEnter={() => {
                if (currentSubmenu === 'none') {
                  setFocusedItemIndex(
                    menuItems.findIndex(item => item.type === 'unmerge'),
                  );
                }
              }}
            >
              <Split className='h-4 w-4' />
              Unmerge cells
            </button>
          )}
          <div className='divider my-1 mx-2' />
        </>
      )}

      {/* Delete table */}
      <button
        onClick={() => handleAction(onDeleteTable)}
        className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors text-error ${
          currentSubmenu === 'none' &&
          focusedItemIndex ===
            menuItems.findIndex(item => item.type === 'delete')
            ? 'bg-error text-error-content'
            : 'hover:bg-base-200'
        }`}
        role='menuitem'
        onMouseEnter={() => {
          if (currentSubmenu === 'none') {
            setFocusedItemIndex(
              menuItems.findIndex(item => item.type === 'delete'),
            );
          }
        }}
      >
        <Trash2 className='h-4 w-4' />
        Delete table
      </button>
    </div>,
    document.body,
  );
}
