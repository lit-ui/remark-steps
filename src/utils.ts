interface HProperties {
  className?: string;
  id?: string;
}

interface Data {
  hName?: string;
  hChildren?: CustomContainerNode[];
  hProperties?: HProperties;
}

export interface CustomContainerNode {
  type: string;
  name?: string;
  children: CustomContainerNode[];
  depth?: number;
  data?: Data;
  value?: string;
}

export const createDivNode = (children: CustomContainerNode[], className: string) => ({
  type: "div",
  children: [...children],
  data: {
    hProperties: {
      className,
    },
  },
});
