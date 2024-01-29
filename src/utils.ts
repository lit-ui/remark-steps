import { ContainerDirective } from "mdast-util-directive";

type DirectiveContent = ContainerDirective["children"];

const createDivNode = (children: DirectiveContent, className: string): ContainerDirective => {
  return {
    type: "containerDirective",
    name: "div",
    children: [...children],
    data: {
      hName: "div",
      hProperties: {
        className,
      },
    },
  };
};

export { createDivNode, DirectiveContent };
