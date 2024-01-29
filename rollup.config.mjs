import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const production = process.env.PRODUCTION ? true : false;
const config = {
  input: {
    index: "src/index.ts",
    steps: "src/steps.ts",
  },
  output: [
    {
      dir: "dist",
      format: "cjs",
      entryFileNames: "[name].js",
    },
    {
      dir: "dist",
      format: "esm",
      entryFileNames: "[name].mjs",
    },
  ],
  plugins: [typescript(), nodeResolve(), production && terser()],
  external: ["unist-util-visit"],
};

export default config;
