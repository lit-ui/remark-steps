import { ast, ASTConfig } from "remark-ast";

const stepsConfig: ASTConfig = {
  type: "containerDirective",
  name: "steps",
  className: "steps",
  children: [
    {
      name: "step",
      className: "step",
      conditional: {
        split: {
          type: "heading",
          depth: 3,
        },
      },
    },
  ],
};

const steps = () => {
  return ast(stepsConfig);
};

export { steps };
