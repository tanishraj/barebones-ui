export type ChangeLogType = 'FORMAT_CHANGE' | 'CONTENT_CHANGE' | 'NO_CHANGE';

export interface ChangeLogs {
  type: ChangeLogType;
  isDirty: boolean;
  details?: {
    formatChanges?: string[];
    contentChanges?: string[];
  };
}

export interface EditorProps {
  markdown?: string;
  onChange?: (markdown: string) => void;
  onChangeLogs?: (logs: ChangeLogs) => void;
  isEditable?: boolean;
  placeholder?: string;
  editorShellClassName?: string;
}
