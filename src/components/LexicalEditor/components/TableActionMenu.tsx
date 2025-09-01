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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleAction = useCallback((action: () => void) => {
    action();
    onClose();
  }, [onClose]);

  if (!position) {
    return null;
  }

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-50 bg-base-100 rounded-lg shadow-xl border border-base-300 py-1 min-w-[200px] not-prose"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Row operations submenu */}
      <div className="relative">
        <button
          className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-base-200 transition-colors"
          onMouseEnter={() => setShowRowMenu(true)}
          onMouseLeave={() => setShowRowMenu(false)}
        >
          <span className="flex items-center gap-2">
            <Rows className="h-4 w-4" />
            Row
          </span>
          <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
        </button>
        
        {showRowMenu && (
          <div
            className="absolute left-full top-0 ml-1 bg-base-100 rounded-lg shadow-xl border border-base-300 py-1 min-w-[180px]"
            onMouseEnter={() => setShowRowMenu(true)}
            onMouseLeave={() => setShowRowMenu(false)}
          >
            <button
              onClick={() => handleAction(onInsertRowAbove)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-base-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Insert above
            </button>
            <button
              onClick={() => handleAction(onInsertRowBelow)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-base-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Insert below
            </button>
            <div className="divider my-1 mx-2" />
            <button
              onClick={() => handleAction(onDeleteRow)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-base-200 transition-colors text-error"
            >
              <Minus className="h-4 w-4" />
              Delete row
            </button>
          </div>
        )}
      </div>

      {/* Column operations submenu */}
      <div className="relative">
        <button
          className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-base-200 transition-colors"
          onMouseEnter={() => setShowColumnMenu(true)}
          onMouseLeave={() => setShowColumnMenu(false)}
        >
          <span className="flex items-center gap-2">
            <Columns className="h-4 w-4" />
            Column
          </span>
          <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
        </button>
        
        {showColumnMenu && (
          <div
            className="absolute left-full top-0 ml-1 bg-base-100 rounded-lg shadow-xl border border-base-300 py-1 min-w-[180px]"
            onMouseEnter={() => setShowColumnMenu(true)}
            onMouseLeave={() => setShowColumnMenu(false)}
          >
            <button
              onClick={() => handleAction(onInsertColumnLeft)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-base-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Insert left
            </button>
            <button
              onClick={() => handleAction(onInsertColumnRight)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-base-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Insert right
            </button>
            <div className="divider my-1 mx-2" />
            <button
              onClick={() => handleAction(onDeleteColumn)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-base-200 transition-colors text-error"
            >
              <Minus className="h-4 w-4" />
              Delete column
            </button>
          </div>
        )}
      </div>

      <div className="divider my-1 mx-2" />

      {/* Merge/Unmerge cells */}
      {(canMergeCells || canUnmergeCells) && (
        <>
          {canMergeCells && onMergeCells && (
            <button
              onClick={() => handleAction(onMergeCells)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-base-200 transition-colors"
            >
              <Merge className="h-4 w-4" />
              Merge cells
            </button>
          )}
          {canUnmergeCells && onUnmergeCells && (
            <button
              onClick={() => handleAction(onUnmergeCells)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-base-200 transition-colors"
            >
              <Split className="h-4 w-4" />
              Unmerge cells
            </button>
          )}
          <div className="divider my-1 mx-2" />
        </>
      )}

      {/* Delete table */}
      <button
        onClick={() => handleAction(onDeleteTable)}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-base-200 transition-colors text-error"
      >
        <Trash2 className="h-4 w-4" />
        Delete table
      </button>
    </div>,
    document.body
  );
}