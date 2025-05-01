export type Node = {
  type: string;
  props: Record<string, any>;
  children: Array<Node | string>;
};
