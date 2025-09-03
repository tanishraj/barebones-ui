import * as React from 'react';
import { useCallback, useState } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onClose?: () => void;
}

const COLORS = [
  ['#FFFFFF', '#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD', '#6C757D', '#495057', '#343A40', '#212529'],
  ['#FFF5F5', '#FFE3E3', '#FFC9C9', '#FFA8A8', '#FF8787', '#FF6B6B', '#FA5252', '#F03E3E', '#E03131', '#C92A2A'],
  ['#FFF0F6', '#FFDEEB', '#FCC2D7', '#FAA2C1', '#F783AC', '#F06595', '#E64980', '#D6336C', '#C2255C', '#A61E4D'],
  ['#F8F0FC', '#F3D9FA', '#EEBEFA', '#E599F7', '#DA77F2', '#CC5DE8', '#BE4BDB', '#AE3EC9', '#9C36B5', '#862E9C'],
  ['#F3F0FF', '#E5DBFF', '#D0BFFF', '#B197FC', '#9775FA', '#845EF7', '#7950F2', '#7048E8', '#6741D9', '#5F3DC4'],
  ['#EDF2FF', '#DBE4FF', '#BAC8FF', '#91A7FF', '#748FFC', '#5C7CFA', '#4C6EF5', '#4263EB', '#3B5BDB', '#364FC7'],
  ['#E7F5FF', '#D0EBFF', '#A5D8FF', '#74C0FC', '#4DABF7', '#339AF0', '#228BE6', '#1C7ED6', '#1971C2', '#1864AB'],
  ['#E3FAFC', '#C5F6FA', '#99E9F2', '#66D9E8', '#3BC9DB', '#22B8CF', '#15AABF', '#1098AD', '#0C8599', '#0B7285'],
  ['#E6FCF5', '#C3FAE8', '#96F2D7', '#63E6BE', '#38D9A9', '#20C997', '#12B886', '#0CA678', '#099268', '#087F5B'],
  ['#EBFBEE', '#D3F9D8', '#B2F2BB', '#8CE99A', '#69DB7C', '#51CF66', '#40C057', '#37B24D', '#2F9E44', '#2B8A3E'],
  ['#F4FCE3', '#E9FAC8', '#D8F5A2', '#C0EB75', '#A9E34B', '#94D82D', '#82C91E', '#74B816', '#66A80F', '#5C940D'],
  ['#FFF9DB', '#FFF3BF', '#FFEC99', '#FFE066', '#FFD43B', '#FCC419', '#FAB005', '#F59F00', '#F08C00', '#E67700'],
  ['#FFF4E6', '#FFE8CC', '#FFD8A8', '#FFC078', '#FFA94D', '#FF922B', '#FD7E14', '#F76707', '#E8590C', '#D9480F'],
];

export default function ColorPicker({ color, onChange, onClose }: ColorPickerProps): JSX.Element {
  const [selectedColor, setSelectedColor] = useState(color);
  const [customColor, setCustomColor] = useState(color);

  const handleColorSelect = useCallback((newColor: string) => {
    setSelectedColor(newColor);
    onChange(newColor);
  }, [onChange]);

  const handleCustomColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    setSelectedColor(newColor);
    onChange(newColor);
  }, [onChange]);

  const handleClearColor = useCallback(() => {
    setSelectedColor('');
    onChange('');
  }, [onChange]);

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        {COLORS.map((row, i) => (
          <div key={i} className="flex gap-1">
            {row.map((cellColor) => (
              <button
                key={cellColor}
                className={`w-7 h-7 rounded border-2 transition-all hover:scale-110 ${
                  selectedColor === cellColor
                    ? 'border-primary shadow-lg'
                    : 'border-base-300 hover:border-primary/50'
                }`}
                style={{ backgroundColor: cellColor }}
                onClick={() => handleColorSelect(cellColor)}
                aria-label={`Select color ${cellColor}`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="divider my-2" />
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          <label className="text-sm font-medium">Custom:</label>
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            className="w-10 h-10 border-2 border-base-300 rounded cursor-pointer"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                handleColorSelect(e.target.value);
              }
            }}
            className="input input-bordered input-sm w-24 font-mono"
            placeholder="#000000"
          />
        </div>
        
        <button
          className="btn btn-ghost btn-sm"
          onClick={handleClearColor}
        >
          Clear
        </button>
      </div>
      
      {onClose && (
        <div className="flex justify-end">
          <button
            className="btn btn-primary btn-sm"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}