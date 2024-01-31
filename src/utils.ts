export interface CustomContainerNode {
  type: string;
  name?: string;
  children: CustomContainerNode[];
  depth?: number;
  data: {
    hProperties: {
      className: string;
      id?: string;
    };
  };
  value?: string;
}

export const createDivNode = (children: CustomContainerNode[], className: string): CustomContainerNode => ({
  type: "div",
  children: [...children],
  data: {
    hProperties: {
      className,
    },
  },
});
