import React from 'react';
import type { Node } from './types.js';
import { sanitizeAST } from './sanitize.js';

interface LynxRendererProps {
  ast: (Node | string)[];
}

export const LynxRenderer: React.FC<LynxRendererProps> = ({ ast }) => {
  const renderNode = (node: Node | string, key: number): JSX.Element => {
    if (node === null || node === undefined) {
      return React.createElement('text', { key }, ''); // fallback
    }

    if (typeof node === 'string') {
      return React.createElement('text', { key }, node);
    }

    if (typeof node !== 'object' || typeof node.type !== 'string') {
      console.warn('Invalid node:', node);
      return React.createElement('text', { key }, '[Invalid]');
    }

    const { type, props = {}, children = [] } = node;

    const Comp = type as keyof JSX.IntrinsicElements;

    try {
      return React.createElement(
        Comp,
        { key, ...props },
        children.map((child, i) => renderNode(child, i)),
      );
    } catch (e) {
      console.error('Error rendering node:', node, e);
      return React.createElement('text', { key }, '[Render Error]');
    }
  };

  const safeAst = sanitizeAST(ast);
  return React.createElement(
    'view',
    null,
    safeAst.map((node, i) => renderNode(node, i)),
  );
};
