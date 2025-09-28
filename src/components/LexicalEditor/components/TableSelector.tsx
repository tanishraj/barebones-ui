import * as React from 'react';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { X, Table } from 'lucide-react';

interface TableSelectorProps {
  onInsert: (rows: number, cols: number) => void;
  onCancel: () => void;
}

const MAX_ROWS = 10;
const MAX_COLS = 10;

export default function TableSelector({ onInsert, onCancel }: TableSelectorProps): JSX.Element {
  const [hoveredRow, setHoveredRow] = useState(1);
  const [hoveredCol, setHoveredCol] = useState(1);
  const [selectedRows, setSelectedRows] = useState(2);
  const [selectedCols, setSelectedCols] = useState(3);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  const handleMouseEnter = useCallback((row: number, col: number) => {
    setHoveredRow(row);
    setHoveredCol(col);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Don't reset to 0, keep the selection visible
    setHoveredRow(selectedRows);
    setHoveredCol(selectedCols);
  }, [selectedRows, selectedCols]);

  const handleGridClick = useCallback((row: number, col: number) => {
    setSelectedRows(row);
    setSelectedCols(col);
    // Auto-insert on click for better UX
    onInsert(row, col);
  }, [onInsert]);

  const handleInsert = useCallback(() => {
    if (selectedRows > 0 && selectedCols > 0) {
      onInsert(selectedRows, selectedCols);
    }
  }, [selectedRows, selectedCols, onInsert]);

  const gridCells = useMemo(() => {
    const cells = [];
    for (let row = 1; row <= MAX_ROWS; row++) {
      for (let col = 1; col <= MAX_COLS; col++) {
        const isActive = row <= hoveredRow && col <= hoveredCol;
        
        cells.push(
          <div
            key={`${row}-${col}`}
            className={`
              w-7 h-7 border cursor-pointer transition-all duration-150
              ${isActive 
                ? 'bg-primary border-primary shadow-sm scale-105' 
                : 'border-base-300 hover:border-primary/50 hover:bg-base-200'
              }
            `}
            onMouseEnter={() => handleMouseEnter(row, col)}
            onClick={() => handleGridClick(row, col)}
          />
        );
      }
    }
    return cells;
  }, [hoveredRow, hoveredCol, handleMouseEnter, handleGridClick]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  }, [onCancel]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 prose-none"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-base-100 rounded-lg shadow-xl w-full max-w-md not-prose"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          <div className="flex items-center gap-2">
            <Table className="h-5 w-5" />
            <h3 className="text-lg font-semibold leading-normal">Insert Table</h3>
          </div>
          <button
            onClick={onCancel}
            className="btn btn-ghost btn-sm btn-circle"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Grid Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Select table size
            </label>
            <div className="inline-block p-2 bg-base-200 rounded-lg">
              <div 
                className="grid grid-cols-10 gap-0.5"
                onMouseLeave={handleMouseLeave}
              >
                {gridCells}
              </div>
              <div className="text-center mt-2 text-sm font-medium">
                {hoveredRow} × {hoveredCol} Table
              </div>
            </div>
          </div>

          {/* Manual Input */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Rows
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={selectedRows}
                onChange={(e) => setSelectedRows(Math.max(1, parseInt(e.target.value) || 1))}
                className="input input-bordered input-sm w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Columns
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={selectedCols}
                onChange={(e) => setSelectedCols(Math.max(1, parseInt(e.target.value) || 1))}
                className="input input-bordered input-sm w-full"
              />
            </div>
          </div>

          {/* Header Option */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="text-sm font-medium">Include header row</span>
              <input
                type="checkbox"
                checked={includeHeaders}
                onChange={(e) => setIncludeHeaders(e.target.checked)}
                className="checkbox checkbox-primary checkbox-sm"
              />
            </label>
          </div>

          {/* Quick Templates */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Quick templates
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setSelectedRows(3); setSelectedCols(3); }}
                className="btn btn-xs btn-outline"
              >
                3×3
              </button>
              <button
                onClick={() => { setSelectedRows(4); setSelectedCols(4); }}
                className="btn btn-xs btn-outline"
              >
                4×4
              </button>
              <button
                onClick={() => { setSelectedRows(5); setSelectedCols(3); }}
                className="btn btn-xs btn-outline"
              >
                5×3
              </button>
              <button
                onClick={() => { setSelectedRows(3); setSelectedCols(5); }}
                className="btn btn-xs btn-outline"
              >
                3×5
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-base-300">
          <button
            onClick={onCancel}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            className="btn btn-primary"
          >
            Insert Table
          </button>
        </div>
      </div>
    </div>
  );
}