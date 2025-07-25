import { ReactNode } from 'react';
import {
  DecoratorNode,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
} from 'lexical';

import { SourceNodeComponent } from './SourceNodeComponent';

interface SerializedNode extends SerializedLexicalNode {
  ids: string[];
}

export class SourceNode extends DecoratorNode<ReactNode> {
  __ids: string[];

  static getType() {
    return 'source';
  }

  static clone(node: SourceNode): SourceNode {
    return new SourceNode([...node.__ids], node.__key);
  }

  constructor(ids: string[] | string, key?: NodeKey) {
    super(key);
    this.__ids = Array.isArray(ids) ? ids : [ids];
  }

  static importJSON(serializedNode: SerializedLexicalNode): SourceNode {
    const ids = (serializedNode as SerializedNode).ids || [];
    const node = $createSourceNode(ids);
    return node;
  }

  append(id: string): SourceNode {
    return new SourceNode([...this.__ids, id]);
  }

  createDOM(): HTMLElement {
    const span = document.createElement('span');
    span.style.display = 'inline-block';
    return span;
  }

  updateDOM(): false {
    return false;
  }

  // Make the node non-deletable by making it isolated
  isIsolated(): boolean {
    return true;
  }

  decorate(): ReactNode {
    return this.__ids.map(id => <SourceNodeComponent key={id} sourceId={id} />);
  }
}

export function $createSourceNode(id: string[]): SourceNode {
  return new SourceNode(id);
}

export function $isSourceNode(
  node: LexicalNode | null | undefined,
): node is SourceNode {
  return node instanceof SourceNode;
}
