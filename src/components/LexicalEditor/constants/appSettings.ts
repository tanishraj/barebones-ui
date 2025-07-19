const DEFAULT_SETTINGS = {
  isRichText: true,
  listStrictIndent: true,
  tableCellMerge: true,
  tableCellBackgroundColor: true,
  tableHorizontalScroll: true,
  showTableOfContents: true,
  showTreeView: true,
  hasLinkAttributes: true,
} as const;

export const INITIAL_SETTINGS = {
  ...DEFAULT_SETTINGS,
};

// Type definitions for settings
export type AppSettings = typeof INITIAL_SETTINGS;
export type AppSettingsName = keyof typeof INITIAL_SETTINGS;
export type AppSettingsType = Record<AppSettingsName, boolean>;
