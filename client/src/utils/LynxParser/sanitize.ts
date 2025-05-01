import type { Node } from './types.js';

export function sanitizeAST(ast: (Node | string)[]): (Node | string)[] {
  return ast
    .filter(Boolean) // Remove null/undefined
    .map((node) => {
      if (typeof node === 'string') return node;

      if (
        typeof node !== 'object' ||
        typeof node.type !== 'string' ||
        typeof node.props !== 'object' ||
        !Array.isArray(node.children)
      ) {
        console.warn('Invalid node found in AST:', node);
        return {
          type: 'text',
          props: {},
          children: ['[Invalid node]'],
        };
      }

      return {
        ...node,
        props: node.props ?? {},
        children: sanitizeAST(node.children ?? []),
      };
    });
}
