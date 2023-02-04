/**
 * @vitest-environment jsdom
 */

import { test, expect } from "vitest";

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

test("domConnector", () => {
  const template = "<div>Hello World</div>";
  const dom = domConnector(template);

  expect(dom).toBeInstanceOf(Object);
  expect(dom.html).toBe(template);
  expect(dom.render).toBeInstanceOf(Function);
});
