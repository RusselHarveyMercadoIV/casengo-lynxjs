import { useEffect, useState } from 'react';
import { parseLynxTags } from '../utils/LynxParser/parser.js';
import type { Node } from '../utils/LynxParser/types.js';

export function useParsedLynx(input: string) {
  const [ast, setAst] = useState<(Node | string)[]>([]);

  useEffect(() => {
    // Defer parsing
    const timeout = setTimeout(() => {
      const result = parseLynxTags(input);
      setAst(result);
    }, 10);

    return () => clearTimeout(timeout);
  }, [input]);

  return ast;
}
