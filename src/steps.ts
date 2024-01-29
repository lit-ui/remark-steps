import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import { createDivNode, type CustomContainerNode } from "./utils";

const steps = () => {
  const transformer = (ast: Root) => {
    visit(ast, "containerDirective", (node: CustomContainerNode) => {
      if (node.type === "containerDirective" && node.name === "steps") {
        let newChildren: CustomContainerNode[] = [];
        let stepDivNode: CustomContainerNode | null = null;
        let nonHeadingChildren: CustomContainerNode[] = [];

        node.children?.forEach((child: CustomContainerNode) => {
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
          (stepDivNode as CustomContainerNode).children.push(createDivNode([...nonHeadingChildren], "step_content"));
        }

        node.children = newChildren;
        node.data = {
          hProperties: {
            className: "steps",
          },
        };
      }
    });
    return ast;
  };
  return transformer;
};

export { steps };
