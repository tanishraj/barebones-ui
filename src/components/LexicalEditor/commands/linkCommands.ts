import { createCommand, LexicalCommand } from 'lexical';

export type OpenLinkEditorPayload = {
  mode: 'create' | 'edit';
};

export const OPEN_LINK_EDITOR_COMMAND: LexicalCommand<OpenLinkEditorPayload> =
  createCommand('OPEN_LINK_EDITOR_COMMAND');