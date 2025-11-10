import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

// Get environment variable
const isProd = process.env.env === "prod";

export default [
  // JS bundle
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs.cjs",
        format: "cjs",
        sourcemap: !isProd,
      }, // CJS
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: !isProd,
      }, // ESM
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
    plugins: [dts()],
  },
];
