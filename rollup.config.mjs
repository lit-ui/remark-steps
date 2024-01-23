import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const config = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/index.mjs",
      format: "esm",
    },
  ],
  plugins: [typescript(), nodeResolve(), terser()],
  external: ["unist-util-visit"],
};

export default config;
