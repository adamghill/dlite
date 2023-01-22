import { isFn, get } from "./utils.js";

/**
 * Holds all the browser's event list, ie: click, mouseover, keyup
 * @type {array}
 */
const EVENTS_LIST = [];

for (const key in document) {
  const isEvent = document[key] === null || isFn(document[key]);

  if (key.startsWith("on") && isEvent) {
    EVENTS_LIST.push(key.substring(2));
  }
}

/**
 * @type {string} attribute to hold all events name
 */
const ATTR_EVENTS_LIST = "dl--elist";

/**
 * Make an event name
 * @param {string} e the event name
 * @returns {string}
 */
const generateEventName = (e) => {
  return `dl--on-${e}`;
};

/**
 * Tokenize all the events, change @* to dl--on-*
 * @param {HTMLElement} selector
 * @returns {void}
 */
export function tokenizeEvents(selector) {
  /**
   * '@call'
   * Wildcard events, base of the type of the element it will assign the right event name
   * ie: on input element, '@call' will turn into 'dl--on-input' and 'dl--on-paste'
   * on ahref, '@call' will turn into 'dl--on-click'
   *
   * '@bind'
   * For two way data binding in input elements
   *
   */
  for (const el of selector.querySelectorAll("[\\@call], [\\@bind]")) {
    let method = el.getAttribute("@call");
    el.removeAttribute("@call");

    const isBind = el.hasAttribute("@bind");

    if (isBind) {
      el.setAttribute("dl--bind", el.getAttribute("@bind"));
      el.removeAttribute("@bind");
      method = "__$bindInput";
    }

    let events = ["click"];

    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      events = ["input", "paste"];
    } else if (el instanceof HTMLSelectElement) {
      events = ["change"];
    } else if (el instanceof HTMLFormElement) {
      events = ["submit"];
    } else if (el instanceof HTMLAnchorElement) {
      el.setAttribute("href", "javascript:void(0);");
    }

    let eventsList = (el.getAttribute(ATTR_EVENTS_LIST) || "")
      .split(",")
      .filter((v) => v);

    eventsList = eventsList.concat(events);
    el.setAttribute(ATTR_EVENTS_LIST, eventsList.join(","));

    for (const e of events) {
      el.setAttribute(generateEventName(e), method);
    }
  }

  // Regular event list
  for (const e of EVENTS_LIST) {
    for (const el of selector.querySelectorAll(`[\\@${e}]`)) {
      const eventsList = (el.getAttribute(ATTR_EVENTS_LIST) || "")
        .split(",")
        .filter((v) => v);

      eventsList.push(e);
      el.setAttribute(ATTR_EVENTS_LIST, eventsList.join(","));
      el.setAttribute(generateEventName(e), el.getAttribute(`@${e}`));
      el.removeAttribute(`@${e}`);

      if (el instanceof HTMLAnchorElement)
        el.setAttribute("href", "javascript:void(0);");
    }
  }
}

/**
 * Bind events to all elements with dl--on-*
 * @param {Element|ShadowRoot} selector The element to look
 * @param {Object} context object of function to bind the events to
 * @returns {MutationObserver}
 */
export function bindEvents(selector, context) {
  function mapEvents(selector) {
    Array.from(selector.querySelectorAll(`[${ATTR_EVENTS_LIST}]`)).map((el) => {
      (el.getAttribute(ATTR_EVENTS_LIST) || "")
        .split(",")
        .filter((v) => v)
        .map((e) => {
          el[`on${e}`] = (event) => {
            event.preventDefault();

            const method = el.getAttribute(generateEventName(e));
            context[method].call(context, event);
          };
        });
    });
  }

  // set initial values
  Array.from(selector.querySelectorAll(`[dl--bind]`)).map((el) => {
    const value = get(context.data, el.getAttribute("dl--bind"));

    try {
      if (el.tagName === "INPUT" && ["radio", "checkbox"].includes(el.type)) {
        if (value.includes(el.value)) {
          el.checked = true;
        }
      } else {
        el.value = value;
      }
    } catch (e) {
      //
    }
  });

  const mutationsObserver = new MutationObserver((mutations) => {
    [...mutations]
      .filter((m) => m.addedNodes.length > 0)
      .map((m2) => m2.target)
      .map((t) => mapEvents(t));
  });

  mutationsObserver.observe(selector, {
    attributes: true,
    childList: true,
    subtree: true,
  });

  mapEvents(selector);

  return mutationsObserver;
}
