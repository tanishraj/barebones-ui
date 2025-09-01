import { useState, useCallback, useEffect, useRef } from 'react';

interface TableSelectorMinimalProps {
  onInsert: (rows: number, cols: number) => void;
  onClose: () => void;
  anchorElement: HTMLElement | null;
}

const MAX_ROWS = 8;
const MAX_COLS = 8;

export default function TableSelectorMinimal({
  onInsert,
  onClose,
  anchorElement,
}: TableSelectorMinimalProps): JSX.Element | null {
  const [hoveredRow, setHoveredRow] = useState(3);
  const [hoveredCol, setHoveredCol] = useState(3);
  const selectorRef = useRef<HTMLDivElement>(null);

  // Position the selector near the button
  useEffect(() => {
    if (!anchorElement || !selectorRef.current) return;

    const rect = anchorElement.getBoundingClientRect();
    const selector = selectorRef.current;

    selector.style.position = 'fixed';
    selector.style.top = `${rect.bottom + 4}px`;
    selector.style.left = `${rect.left}px`;
  }, [anchorElement]);

  // Close on escape or click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleCellHover = useCallback((row: number, col: number) => {
    setHoveredRow(row);
    setHoveredCol(col);
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Reset to default 3x3 when mouse leaves the grid
    setHoveredRow(3);
    setHoveredCol(3);
  }, []);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      onInsert(row, col);
      onClose();
    },
    [onInsert, onClose],
  );

  if (!anchorElement) return null;

  return (
    <div
      ref={selectorRef}
      className='z-50 bg-base-100 rounded-lg shadow-xl border border-base-300 p-3'
    >
      {/* Grid */}
      <div
        className='flex flex-col gap-0.5 mb-2'
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: MAX_ROWS }, (_, row) => (
          <div key={`row-${row}`} className='flex gap-1'>
            {Array.from({ length: MAX_COLS }, (_, col) => {
              const isActive = row < hoveredRow && col < hoveredCol;
              return (
                <div
                  key={`${row}-${col}`}
                  className={`
                    w-6 h-6 border cursor-pointer transition-all
                    ${
                      isActive
                        ? 'bg-primary border-primary'
                        : 'border-base-300 hover:border-primary/50'
                    }
                  `}
                  onMouseEnter={() => handleCellHover(row + 1, col + 1)}
                  onClick={() => handleCellClick(row + 1, col + 1)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Size indicator */}
      <div className='text-center text-xs text-base-content/70'>
        {`${hoveredRow} × ${hoveredCol}`}
      </div>
    </div>
  );
}
