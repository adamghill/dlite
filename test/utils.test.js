/**
 * @vitest-environment jsdom
 */

import { describe, test, expect } from "vitest";
import { Fixture } from "./helpers.js";

import {
  isFn,
  isObjKeyFn,
  htmlToDom,
  parseLit,
  computeState,
  set,
  get,
  toStrLit,
  kebabCase,
  camelCase,
  styleMap,
} from "../src/utils.js";

describe("isFn", () => {
  test("isFn", () => {
    const fn = () => {};
    expect(isFn(fn)).toBe(true);
  });
});

describe("isObjKeyFn", () => {
  test("is a function", () => {
    const o = {
      fn: () => {},
    };
    expect(isObjKeyFn(o, "fn")).toBe(true);
  });

  test("not a function", () => {
    const o = {
      fn: 1,
    };
    expect(isObjKeyFn(o, "fn")).toBe(false);
  });
});

describe("parseLit", () => {
  test("to return a function", () => {
    expect(parseLit("Hello ${this.name}")).toBeInstanceOf(Function);
  });
  test("Hello ${this.name} === Hello world", () => {
    expect(parseLit("Hello ${this.name}")({ name: "world" })).toBe(
      "Hello world"
    );
  });
  test("Template literal stuff", () => {
    expect(parseLit("${1 + 1}")()).toBe("2");
  });
});

describe("htmlToDom", () => {
  test("div to HTMLElement", () => {
    const div = "<div>Hello World</div>";
    const { _, body } = htmlToDom(div);

    expect(body).toBeInstanceOf(HTMLElement);
  });

  test("div to return same outerHTML div", () => {
    const div = "<body><div>Hello World</div></body>";
    const { _, body } = htmlToDom(div);

    expect(body.outerHTML).toBe(div);
  });

  test("style to HTMLHeadElement", () => {
    const style = "<style>* { color: red; }</style>";
    const html = `${style}<div>Hello World</div>`;
    const { head, _ } = htmlToDom(html);

    expect(head).toBeInstanceOf(HTMLHeadElement);
  });

  test("style to same innerHTML", () => {
    const style = "<style>* { color: red; }</style>";
    const html = `${style}<div>Hello World</div>`;
    const { head, _ } = htmlToDom(html);

    expect(head.innerHTML).toBe(style);
  });
});

describe("computeState", () => {
  test("instantialize must return a function", () => {
    expect(computeState("name", (state) => {})).toBeInstanceOf(Function);
  });

  test("computeState should mutate the state via returned value", () => {
    const data = {
      name: "HTML",
    };
    const m = computeState("value", (state) => {
      return `OK ${state.name}`;
    });
    m(data);
    expect(data.value).toBe("OK HTML");
  });
});

describe("SET", () => {
  test("Set simple key value", () => {
    const o = {};
    set(o, "key", "value");
    expect(o.key).toBe("value");
  });

  test("Set dot notation", () => {
    const o = {};
    set(o, "key.key2.key3", 10);
    expect(o.key.key2.key3).toBe(10);
  });

  test("Set dot notation to be object", () => {
    const o = {};
    set(o, "key.key2.key3", 10);
    expect(o.key.key2).toBeInstanceOf(Object);
  });
});

describe("GET", () => {
  test("Get simple key value", () => {
    const o = {
      key: "value",
    };
    expect(get(o, "key")).toBe("value");
  });

  test("Get dot notation", () => {
    const o = {
      key: {
        key2: {
          key3: 10,
        },
      },
    };
    expect(get(o, "key.key2.key3")).toBe(10);
  });

  test("Set dot notation to be object", () => {
    const o = {
      key: {
        key2: {
          key3: 10,
        },
      },
    };
    expect(get(o, "key.key2")).toBeInstanceOf(Object);
  });

  test("Set dot notation to be undefined", () => {
    const o = {
      key: {
        key2: {
          key3: 10,
        },
      },
    };
    expect(get(o, "key.key2.k4")).toBe(undefined);
  });
});

describe("toStrLit", () => {
  [
    new Fixture("hello world", "hello world", "string to string"),
    new Fixture(
      "hello {key}",
      "hello ${typeof key != 'undefined' ? key : ''}",
      "string with var"
    ),
    new Fixture(
      "hello {key.aFunction()}",
      "hello ${typeof key.aFunction() != 'undefined' ? key.aFunction() : ''}",
      "string with var with method inside"
    ),
    new Fixture(
      "hello {key.val.something }",
      "hello ${typeof key.val.something  != 'undefined' ? key.val.something  : ''}",
      "string with var with properties"
    ),
    new Fixture(
      "hello {key.val.something + y + z}",
      "hello ${typeof key.val.something + y + z != 'undefined' ? key.val.something + y + z : ''}",
      "string with var with operations"
    ),
    new Fixture(
      "hello {this.x ? y : z}",
      "hello ${typeof this.x ? y : z != 'undefined' ? this.x ? y : z : ''}",
      "string with var with ternary"
    ),
    new Fixture(
      "hello  {  key}",
      "hello  ${typeof   key != 'undefined' ?   key : ''}",
      "string with var with inside space left"
    ),
    new Fixture(
      "hello <div id='{key}'></div>",
      "hello <div id='${typeof key != 'undefined' ? key : ''}'></div>",
      "string with var with inside space left"
    ),
    new Fixture(
      "hello  {  key   }",
      "hello  ${typeof   key    != 'undefined' ?   key    : ''}",
      "string with var with inside space right"
    ),
    new Fixture(
      "hello  {key   }",
      "hello  ${typeof key    != 'undefined' ? key    : ''}",
      "string with var with inside space right 2"
    ),
    new Fixture(
      "hello  {key}",
      "hello  ${typeof key != 'undefined' ? key : ''}",
      "string with var with leading extra space"
    ),
    new Fixture(
      "hello  {key}   ",
      "hello  ${typeof key != 'undefined' ? key : ''}   ",
      "string with var with trailing extra space"
    ),
    new Fixture(
      "hello ${key}",
      "hello ${typeof key != 'undefined' ? key : ''}",
      "string with $"
    ),
    new Fixture(
      "hello $${key}",
      "hello $${typeof key != 'undefined' ? key : ''}",
      "string with $$"
    ),
    new Fixture(
      "hello ${key.aFunction()}",
      "hello ${typeof key.aFunction() != 'undefined' ? key.aFunction() : ''}",
      "string with $ with a method inside"
    ),
    new Fixture(
      "hello ${this.x ? y : z}",
      "hello ${typeof this.x ? y : z != 'undefined' ? this.x ? y : z : ''}",
      "string with $ with ternary"
    ),
  ].forEach((fixture) => {
    test(fixture.name, () => {
      expect(toStrLit(fixture.data)).toBe(fixture.expected);
    });
  });
});

describe("kebabCase", () => {
  [
    new Fixture("hello", "hello"),
    new Fixture("hello-world", "hello-world"),
    new Fixture("helloWorld", "hello-world"),
    new Fixture("helloworld", "helloworld"),
    new Fixture("helloAWorld", "hello-a-world"),
    new Fixture("HelloWorld", "hello-world"),
    new Fixture("HelloABCWorld", "hello-a-b-c-world"),
  ].forEach((fixture) => {
    test(fixture.name, () => {
      expect(kebabCase(fixture.data)).toBe(fixture.expected);
    });
  });
});

describe("camelCase", () => {
  [
    new Fixture("hello", "hello"),
    new Fixture("hello-world", "helloWorld"),
    new Fixture("hello_world", "helloWorld"),
    new Fixture("hello world", "helloWorld"),
    new Fixture("hello my world", "helloMyWorld"),
  ].forEach((fixture) => {
    test(fixture.name, () => {
      expect(camelCase(fixture.data)).toBe(fixture.expected);
    });
  });
});

describe("styleMap", () => {
  test("stylemap", () => {
    const s = {
      color: "blue",
      topLine: "yellow",
      "bottom-dash": "red",
      "font-size": "12px",
      backgroundColor: "purple",
      textSize: "2em",
      margin: "0 20 40 30 !important",
    };

    expect(styleMap(s)).toBe(
      "color: blue; top-line: yellow; bottom-dash: red; font-size: 12px; background-color: purple; text-size: 2em; margin: 0 20 40 30 !important;"
    );
  });
});
