import type { Node } from './types.js';

export function parseLynxTags(input: string): (Node | string)[] {
  const tagStart = /^<([a-zA-Z0-9]+)(.*?)>/;
  const tagEnd = /^<\/([a-zA-Z0-9]+)>/;
  const selfClosing = /^<([a-zA-Z0-9]+)(.*?)\/>/;
  const propRegex = /(\w+)=\{(.*?)\}/g;

  let pos = 0;

  function parseProps(str: string): Record<string, any> {
    const props: Record<string, any> = {};
    let match;
    while ((match = propRegex.exec(str))) {
      const [, key, value] = match;
      try {
        props[key] = JSON.parse(value); // safer alternative to eval
      } catch {
        props[key] = value;
      }
    }
    return props;
  }

  function parseNodes(): (Node | string)[] {
    const nodes: (Node | string)[] = [];
    while (pos < input.length) {
      if (input.slice(pos).startsWith('</')) break;

      if (input[pos] === '<') {
        const remaining = input.slice(pos);

        const selfClose = selfClosing.exec(remaining);
        if (selfClose) {
          const [full, tag, rawProps] = selfClose;
          pos += full.length;
          nodes.push({
            type: tag,
            props: parseProps(rawProps),
            children: [],
          });
          continue;
        }

        const open = tagStart.exec(remaining);
        if (open) {
          const [full, tag, rawProps] = open;
          pos += full.length;
          const children = parseNodes();

          const end = tagEnd.exec(input.slice(pos));
          if (!end || end[1] !== tag) {
            throw new Error(`Tag mismatch: expected </${tag}>`);
          }
          pos += end[0].length;

          // Sanitize the parsed node before pushing it
          const node: Node = {
            type: tag,
            props: parseProps(rawProps),
            children: children.length > 0 ? children : ['[Invalid Child]'],
          };

          nodes.push(node);
          continue;
        }
      }

      // Handle text (ignore leading/trailing spaces)
      const nextTag = input.indexOf('<', pos);
      const textEnd = nextTag === -1 ? input.length : nextTag;
      const text = input.slice(pos, textEnd).trim();
      if (text) nodes.push(text);
      pos = textEnd;
    }

    return nodes;
  }

  return parseNodes();
}
