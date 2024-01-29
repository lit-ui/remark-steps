import type { Transformer, Plugin } from "unified";
import type { ContainerDirective } from "mdast-util-directive";
import { createDivNode, type DirectiveContent } from "./utils";

const steps: Plugin = (): Transformer => {
  return async (root) => {
    const { visit } = await import("unist-util-visit");
    visit(root, "containerDirective", (node: ContainerDirective) => {
      if (node.type === "containerDirective" && node.name === "steps") {
        let newChildren: DirectiveContent = [];
        let stepDivNode: any | null = null;
        let nonHeadingChildren: DirectiveContent = [];

        node.children?.forEach((child: any) => {
          if (child.type === "heading" && child.depth === 3) {
            if (nonHeadingChildren.length > 0 && stepDivNode) {
              stepDivNode?.children.push(createDivNode([...nonHeadingChildren], "step_content"));
              nonHeadingChildren = [];
            }

            stepDivNode = createDivNode([], "step");
            newChildren.push(stepDivNode);

            stepDivNode.children.push({
              type: "div",
              children: [child],
              data: {
                hProperties: {
                  className: "step_heading",
                },
              },
            });
          } else {
            nonHeadingChildren.push(child);
          }
        });

        if (nonHeadingChildren.length > 0 && stepDivNode) {
          stepDivNode.children.push(createDivNode([...nonHeadingChildren], "step_content"));
        }

        node.children = newChildren;
        node.data = {
          hProperties: {
            className: "steps",
          },
        };
      }
    });
  };
};

export { steps };
