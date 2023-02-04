/**
 * @vitest-environment jsdom
 */

import { test, expect } from "vitest";

import Component from "../src/component.js";

test("initialize", () => {
  const template = `<div>Hello World</div>`;

  const c = Component({
    template: template,
    tagName: "my-tag",
  });

  expect(c).toBe(undefined);
});
