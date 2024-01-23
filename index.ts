import { visit } from "unist-util-visit";

interface HProperties {
  className?: string;
  id?: string;
}

interface Data {
  hProperties?: HProperties;
}

interface AstNode {
  type: string;
  name?: string;
  children: AstNode[];
  depth?: number;
  data?: Data;
  value?: string;
}

const plugin = (options: any): any => {
  const transformer = async (ast: AstNode) => {
    visit(ast, "containerDirective", (node: AstNode) => {
      if (node.type === "containerDirective" && node.name === "steps") {
        let newChildren: AstNode[] = [];
        let stepDivNode: AstNode | null = null;
        let nonHeadingChildren: AstNode[] = [];

        node.children?.forEach((child: AstNode) => {
          if (child.type === "heading" && child.depth === 3) {
            if (nonHeadingChildren.length > 0 && stepDivNode) {
              stepDivNode?.children.push({
                type: "div",
                children: [...nonHeadingChildren],
                data: {
                  hProperties: {
                    className: "step_content",
                  },
                },
              });
              nonHeadingChildren = [];
            }
            const originalClassName = child.data?.hProperties?.className || "";
            child.data = {
              hProperties: {
                id: child.children[0].value,
                className: `step_title ${originalClassName}`.trim(),
              },
            };
            stepDivNode = {
              type: "div",
              children: [child],
              data: {
                hProperties: {
                  className: "step",
                },
              },
            };
            newChildren.push(stepDivNode);
          } else {
            nonHeadingChildren.push(child);
          }
        });

        if (nonHeadingChildren.length > 0 && stepDivNode) {
          (stepDivNode as AstNode).children.push({
            type: "div",
            children: [...nonHeadingChildren],
            data: {
              hProperties: {
                className: "step_content",
              },
            },
          });
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

  return transformer;
};

export default plugin;
