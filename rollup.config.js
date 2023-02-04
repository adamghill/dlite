/**
 * Rollup config
 *
 * This script config allows us to create a bundle of the library
 * the library is meant to be used at ES module, or <script type="module" src"">
 *
 * intall:
 * > npm install -g rollup
 *
 * run
 * > rollup -c
 */

import banner2 from "rollup-plugin-banner2";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" assert { type: "json" };

export default {
  input: "./src/index.js",
  output: {
    file: `./dist/${pkg.name}.es.js`,
    format: "esm",
  },
  plugins: [
    terser(),
    banner2(
      () => `/* ${pkg.name} v${pkg.version} */
`
    ),
  ],
};
