import {
  DecoratorNode,
  type DOMConversionMap,
  type DOMConversionOutput,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalEditor,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
  $applyNodeReplacement,
} from 'lexical';
import React, { Suspense, useRef } from 'react';

export type SerializedSourceNode = Spread<
  {
    sources: string[];
    type: 'source';
    version: 1;
  },
  SerializedLexicalNode
>;

export type SourceData = {
  id: string | number;
  title?: string;
  url?: string;
  description?: string;
  [key: string]: any;
};

function convertSourceElement(domNode: Node): DOMConversionOutput | null {
  if (domNode instanceof HTMLElement && domNode.dataset.lexicalSource) {
    const sources = domNode.dataset.lexicalSource.split(',');
    const node = $createSourceNode(sources);
    return { node };
  }
  return null;
}

// Component to render individual source circle
interface SourceCircleProps {
  source: string;
  onSourceElement?: (sourceId: string, element: HTMLElement | null) => void;
}

const SourceCircle: React.FC<SourceCircleProps> = ({
  source,
  onSourceElement,
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (ref.current && onSourceElement) {
      onSourceElement(source, ref.current);
    }
  }, [source, onSourceElement]);

  return (
    <span
      ref={ref}
      className='inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-primary bg-primary/10 border border-primary/30 rounded-full cursor-pointer hover:bg-primary/20 transition-colors mx-0.5'
    >
      {source}
    </span>
  );
};

// Component to render the sources
interface SourceComponentProps {
  sources: string[];
  nodeKey: NodeKey;
  onSourceElement?: (sourceId: string, element: HTMLElement | null) => void;
}

const SourceComponent: React.FC<SourceComponentProps> = ({
  sources,
  nodeKey,
  onSourceElement,
}) => {
  return (
    <span
      className='inline-flex items-center'
      data-lexical-source-node={nodeKey}
    >
      {sources.map((source, index) => (
        <SourceCircle
          key={`${source}-${index}`}
          source={source}
          onSourceElement={onSourceElement}
        />
      ))}
    </span>
  );
};

export class SourceNode extends DecoratorNode<JSX.Element> {
  __sources: string[];

  static getType(): string {
    return 'source';
  }

  static clone(node: SourceNode): SourceNode {
    return new SourceNode(node.__sources, node.__key);
  }

  constructor(sources: string[], key?: NodeKey) {
    super(key);
    this.__sources = sources;
  }

  createDOM(_config: EditorConfig): HTMLElement {
    const element = document.createElement('span');
    element.className = 'lexical-source-node';
    element.dataset.lexicalSource = this.__sources.join(',');
    return element;
  }

  updateDOM(_prevNode: SourceNode): boolean {
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (node: Node) => ({
        conversion: convertSourceElement,
        priority: 1,
      }),
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('span');
    element.className = 'lexical-source-node';
    element.dataset.lexicalSource = this.__sources.join(',');
    element.textContent = `[${this.__sources.join(',')}]`;
    return { element };
  }

  static importJSON(serializedNode: SerializedSourceNode): SourceNode {
    const { sources } = serializedNode;
    const node = $createSourceNode(sources);
    return node;
  }

  exportJSON(): SerializedSourceNode {
    return {
      sources: this.__sources,
      type: 'source',
      version: 1,
    };
  }

  getSources(): string[] {
    return this.__sources;
  }

  setSources(sources: string[]): void {
    const writable = this.getWritable();
    writable.__sources = sources;
  }

  addSource(source: string): void {
    const writable = this.getWritable();
    if (!writable.__sources.includes(source)) {
      writable.__sources = [...writable.__sources, source];
    }
  }

  removeSource(source: string): void {
    const writable = this.getWritable();
    writable.__sources = writable.__sources.filter(s => s !== source);
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    // Get the source handler from the editor config
    const sourceConfig = (config as any).sourceConfig || {};
    const { onSourceElement } = sourceConfig;

    return (
      <Suspense fallback={null}>
        <SourceComponent
          sources={this.__sources}
          nodeKey={this.__key}
          onSourceElement={onSourceElement}
        />
      </Suspense>
    );
  }

  isInline(): boolean {
    return true;
  }

  getTextContent(): string {
    return `[${this.__sources.join(',')}]`;
  }
}

export function $createSourceNode(sources: string[]): SourceNode {
  const sourceNode = new SourceNode(sources);
  return $applyNodeReplacement(sourceNode);
}

export function $isSourceNode(
  node: LexicalNode | null | undefined,
): node is SourceNode {
  return node instanceof SourceNode;
}
