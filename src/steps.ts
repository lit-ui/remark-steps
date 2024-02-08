import { ast, ASTConfig } from "remark-ast";

const stepsConfig: ASTConfig = {
  type: "containerDirective",
  name: "steps",
  tag: "div",
  className: "steps",
  children: [
    {
      type: "heading.3",
      name: "step",
      tag: "div",
      className: "step",
      condition: "partition",
    },
  ],
};

const steps = () => {
  return ast(stepsConfig);
};

export { steps };
