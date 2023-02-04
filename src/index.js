import Component from "./component.js";
import { randomChars, selector } from "./utils.js";

const error = (msg) => {
  new Error(`dlite error: ${msg}`);
};

/**
 * Generate random custom element tag
 * @returns {string}
 */
const genRandomCustomElementTagName = () => {
  return `dlite-${randomChars()}`;
};

/**
 * dlite default function initializer
 * @param {object} options the configuration
 */
function Dlite(options) {
  const opt = {
    /**
     * el
     * @type {HTMLElement | string}
     * The target element for inplace element where it will be displayed at.
     * If $template is omitted or null, it will use the el#innerHTML as template.
     * To select in-place element, provide $refId which can be retrieved using
     * document.querySelector('[ref-id="the-refId-provided"]')
     * */
    el: null,
    /**
     * refId
     * @type {string | null}
     * A unique identifier to allow us to select the in-place element.
     * Only when using $el for in-place element. Custom element won't have it
     * To select in-place element, provide $refId which can be retrieve using
     * document.querySelector('[ref-id="the-refId-provided"]')
     *  */
    refId: null,
    /**
     * template
     * @type {string}
     * the template is the template string to use to create the component.
     * If it exists along with $el, $el will be the target, but it will use $template as template
     * This take precedence over $el#innerHTML
     * Omit $template to use $el#innerHTML as template*/
    template: null,
    /**
     * tagName
     * @type {string}
     * The tagname leave as null for in-place element.
     * A string for custom element */
    tagName: null,
    /**
     * shadowDOM
     * @type {boolean}
     * To indicate this element is self-contained as shadow dom */
    shadowDOM: false,
    ...options,
  };

  const hasTagName = !!opt.tagName;
  opt.tagName = opt.tagName || genRandomCustomElementTagName();

  if (opt.el) {
    let el = selector(opt.el);

    if (!opt.template) {
      opt.template = el.innerHTML;
    }

    el.innerHTML = "";

    if (!hasTagName) {
      const tagEl = document.createElement(opt.tagName);

      if (opt.refId) {
        tagEl.setAttribute("ref-id", opt.refId);
      }

      el.parentNode.replaceChild(tagEl, el);
    }
  }

  if (!opt.template) {
    throw error(`Missing 'template' option or 'el' is not valid element.`);
  }

  Component(opt);
}

/**
 *
 * @param {object|array} options, config object of dlite options or array of options
 * @param {object} sharedOptions, to share global options, ie: $store, $router, $events
 */
export default (options, sharedOptions = {}) => {
  if (Array.isArray(options)) {
    options.map((o) => Dlite({ ...sharedOptions, ...o }));
  } else {
    Dlite(options);
  }
};
