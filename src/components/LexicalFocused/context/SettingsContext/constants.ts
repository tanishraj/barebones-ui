const DEFAULT_SETTINGS = {
  listStrictIndent: true,
  tableCellMerge: true,
  tableCellBackgroundColor: true,
  tableHorizontalScroll: true,
  showTableOfContents: true,
  hasLinkAttributes: true,
  hasDraggableBlocks: true,
} as const;

export const INITIAL_SETTINGS = {
  ...DEFAULT_SETTINGS,
};

// Type definitions for settings
export type AppSettings = typeof INITIAL_SETTINGS;
export type AppSettingsName = keyof typeof INITIAL_SETTINGS;
export type AppSettingsType = Record<AppSettingsName, boolean>;
