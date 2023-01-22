/**
 * @vitest-environment jsdom
 */

import { describe, test, expect } from "vitest";

import { nodesByKey } from "../src/emerj.js";

test("nodesByKey", () => {
  const el = document.createElement("div");
  const child = document.createElement("p");
  child.id = "asdf";
  el.prepend(child);

  const makeKey = (node) => node.id;

  const actual = nodesByKey(el, makeKey);

  const expected = '<p id="asdf"></p>';

  expect(actual.asdf.outerHTML).toEqual(expected);
});
