import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

export default [
  // JS bundle
  {
    input: "src/index.ts",
    output: [
      { file: "dist/index.cjs.cjs", format: "cjs", sourcemap: true }, // CJS
      { file: "dist/index.esm.js", format: "esm", sourcemap: true },  // ESM
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ declaration: false }),
      terser(),
    ],
  },
  // Types bundle
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [
      dts(),
    ],
  },
];
