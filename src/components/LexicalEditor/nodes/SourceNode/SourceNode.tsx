import { ReactNode } from 'react';
import { DecoratorNode, LexicalNode, NodeKey } from 'lexical';

import { SourceNodeComponent } from './SourceNodeComponent';

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

  decorate(): ReactNode {
    return this.__ids.map(id => <SourceNodeComponent sourceId={id} />);
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
