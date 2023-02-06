/**
 * @vitest-environment jsdom
 */

import { test, expect } from "vitest";

import Component from "../src/component.js";

test("initialize", () => {
  const template = `<div>Hello World</div>`;

  const actual = Component({
    template: template,
    tagName: "my-tag",
  });

  expect(actual).toBe(null);
});
