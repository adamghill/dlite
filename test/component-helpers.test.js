/**
 * @vitest-environment jsdom
 */

import { describe, test, expect } from "vitest";

import {
  filterMethods,
  filterInitialState,
  filterComputedState,
  storeConnector,
  domConnector,
} from "../src/component-helpers.js";

const INITSTATE1 = {
  el: null,
  data: {
    a: "a",
    b: "b",
    c() {
      return null;
    },
    d() {},
    e() {},
  },
  method1() {},
  methodx() {},
  method3: () => null,
};

test("filterMethods", () => {
  expect(filterMethods(INITSTATE1)).toBeInstanceOf(Object);
  expect(Object.keys(filterMethods(INITSTATE1)).length).toBe(3);
});

test("filterInitialState", () => {
  expect(filterInitialState(INITSTATE1.data)).toBeInstanceOf(Object);
  expect(Object.keys(filterInitialState(INITSTATE1.data)).length).toBe(2);
});

test("filterComputedState", () => {
  expect(filterComputedState(INITSTATE1.data)).toBeInstanceOf(Object);
  expect(Object.keys(filterComputedState(INITSTATE1.data)).length).toBe(3);
});

test("storeConnector", () => {
  const store = storeConnector({
    getState: () => {},
    subscribe: (state) => (state) => {},
  });
  const storeInstance = store({});

  expect(store).toBeInstanceOf(Function);
  expect(storeInstance).toBeInstanceOf(Function);
});

describe("domConnector", () => {
  test("div", () => {
    const template = "<div>Hello World</div>";
    const dom = domConnector(template);

    expect(dom).toBeInstanceOf(Object);
    expect(dom.html).toBe(template);
    expect(dom.render).toBeInstanceOf(Function);
  });

  test("div with template literal", () => {
    const template = `<div>
  Hello {this.world}
</div>
`;
    const dom = domConnector(template);

    const target = document.createElement("div");
    const state = { world: "World" };

    // Check that the template literal gets converted as expected
    expect(dom).toBeInstanceOf(Object);
    expect(dom.html).toBe(
      `<div>
  Hello \${this.world}
</div>
`
    );
    expect(dom.render).toBeInstanceOf(Function);

    // Check that it renders as expected
    expect(target.innerHTML).toBe("");
    expect(dom.render(target, state)).toBe(true);
    expect(target.innerHTML).toBe(
      `<div>
  Hello World
</div>
`
    );
  });

  test("div with template literal and style", () => {
    const template = `<div>
  <style>
    * {
      color: green;
    }
  </style>
  Hello {this.world}
</div>
`;
    const dom = domConnector(template);

    const target = document.createElement("div");
    const state = { world: "World" };

    // Check that the template literal gets converted as expected
    expect(dom).toBeInstanceOf(Object);
    expect(dom.html).toBe(
      `<div>
  <style>
    * {
      color: green;
    }
  </style>
  Hello \${this.world}
</div>
`
    );
    expect(dom.render).toBeInstanceOf(Function);

    // Check that it renders as expected
    expect(target.innerHTML).toBe("");
    expect(dom.render(target, state)).toBe(true);
    expect(target.innerHTML).toBe(
      `<div>
  <style>
    * {
      color: green;
    }
  </style>
  Hello World
</div>
`
    );
  });
});
