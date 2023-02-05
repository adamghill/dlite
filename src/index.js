import Component from "./component.js";
import { randomChars } from "./utils.js";

const error = (msg) => {
  new Error(`dlite error: ${msg}`);
};

/**
 * Generate random custom element tag
 * @returns {string}
 */
const getRandomCustomElementTagName = () => {
  return `dlite-${randomChars()}`;
};

/**
 * dlite default function initializer
 * @param {object} options the configuration
 */
function Dlite(options) {
  const configuration = {
    /**
     * el
     * @type {HTMLElement | string}
     * Element or query selector where the in-place element will be rendered.
     * If $template is `null`, it will use the el#innerHTML as template.
     */
    el: null,

    /**
     * refId
     * @type {string | null}
     * A unique identifier to select an in-place element.
     */
    refId: null,

    /**
     * template
     * @type {string}
     * Template string used to create the component.
     * If it is set with `el`, `el` will be the target, but `template` will override its `innerHTML`.
     */
    template: null,

    /**
     * tagName
     * @type {string}
     * The tag name for the custom element. Not needed for in-place element.
     */
    tagName: null,

    /**
     * shadowDOM
     * @type {boolean}
     * Attach the `Custom Element` to a `Shadow DOM`. Defaults to `false`.
     */
    shadowDOM: false,

    ...options,
  };

  const shouldCreateTag = !configuration.tagName;
  configuration.tagName =
    configuration.tagName || getRandomCustomElementTagName();

  if (configuration.el) {
    let el =
      typeof configuration.el === "string"
        ? document.querySelector(configuration.el)
        : configuration.el;

    if (!el) {
      console.error(`'${configuration.el}' is not valid element.`);
      return;
    }

    if (!configuration.template) {
      configuration.template = el.innerHTML;
    }

    el.innerHTML = "";

    if (shouldCreateTag) {
      const createdEl = document.createElement(configuration.tagName);

      // Set style from original element on new element
      // TODO: Should other attributes carry over?
      createdEl.style = el.getAttribute("style");

      if (configuration.refId) {
        createdEl.setAttribute("ref-id", configuration.refId);
      }

      el.parentNode.replaceChild(createdEl, el);
    }
  }

  if (!configuration.template) {
    throw error(`Missing 'template' option or 'el' is not valid element.`);
  }

  Component(configuration);
}

/**
 *
 * @param {object|array} configuration, `dlite` configuration or array of configurations
 * @param {object} sharedConfiguration, shared global configurations fo reach component; only used with array of configurations
 */
export default (configuration, sharedConfiguration = {}) => {
  if (Array.isArray(configuration)) {
    configuration.map((o) => Dlite({ ...sharedConfiguration, ...o }));
  } else {
    Dlite(configuration);
  }
};
