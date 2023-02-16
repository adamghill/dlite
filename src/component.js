import { bindEvents } from "./events.js";
import { getAttrs, objectOnChange, styleMap, freeze } from "./utils.js";
import {
  filterMethods,
  filterComputedState,
  filterInitialState,
  filterGlobal$Object,
  storeConnector,
  bindPublicMethodsToContext,
  domConnector,
  __$bindInput,
} from "./component-helpers.js";

/**
 * Private context included data and functions
 * to exist only in the render function
 */
const renderContext = {
  __$styleMap: styleMap,
};

/**
 * Component default function initializer
 * @param {object} options The configuration
 * @returns {HTMLElement} The custom element
 */
export default function Component(options = {}) {
  const configuration = {
    /**
     * @type {boolean}
     * Whether the `Custom Element` will be attached to a `Shadow DOM` or not. Defaults to `true`.
     */
    shadowDOM: true,

    /**
     * The element tag name.
     * @type {string}
     */
    tagName: null,

    /**
     * Local state data that will be reactive.
     * @type {object}
     */
    data: {},

    /**
     * The template.
     * @type {string}
     */
    template: null,

    /**
     * Global store/state manager.
     * @type {{getState: function, subscribe: function }}
     */
    $store: { getState: () => undefined, subscribe: () => () => {} },

    /**
     * Lifecycle method that gets called when the component is created.
     * @type {function}
     */
    created() {},

    /**
     * Lifecycle method that gets called when the component is updated.
     * @type {function}
     */
    updated() {},

    /**
     * Lifecycle method that gets called when the component is removed.
     * @type {function}
     */
    removed() {},

    /**
     * Additional options.
     * @type {object}
     */
    ...options,
  };

  const store = storeConnector(configuration.$store);
  const dom = domConnector(configuration.template);
  const methods = filterMethods(configuration);
  const initialState = filterInitialState(configuration.data);
  const computedState = filterComputedState(configuration.data);
  const global$Object = filterGlobal$Object(configuration);

  /**
   * @type {function} Update the computed states
   */
  const updateComputedState = (state) => computedState.forEach((s) => s(state));

  /**
   * @type {HTMLElement} The component's custom element
   */
  let customElement = null;

  /**
   * Register the Web Component
   */
  window.customElements.define(
    configuration.tagName.toLowerCase(),
    class extends HTMLElement {
      constructor() {
        super();

        // Hide the `Custom Element` until it's rendered
        this.style.visibility = !this.style.visibility
          ? "hidden"
          : this.style.visibility;

        /**
         * @type {HTMLElement|ShadowRoot}
         * Attach to a Shadow DOM or just stay a `Custom Element`
         */
        this.$root = configuration.shadowDOM
          ? this.attachShadow({ mode: "open" })
          : this;

        // Set the outside scope's `customElement` to `this` so it can be returned from the default function
        customElement = this;
      }

      /**
       * Renders the component.
       * @param {boolean} firstRender Whether it is the first render or not.
       */
      render(firstRender = false) {
        updateComputedState(this._state);

        if (
          dom.render(this.$root, { ...this._state, ...renderContext }) &&
          !firstRender
        ) {
          configuration.updated.call(this.context);
        }

        // Make the `Custom Element` visible now that it's been rendered
        if (this.style.visibility === "hidden") {
          this.style.removeProperty("visibility");
        }
      }

      /**
       * When element is added
       * @returns {void}
       */
      connectedCallback() {
        if (!this.isConnected) {
          return;
        }

        this._state = {
          ...this._state,
          ...initialState,
          prop: getAttrs(this, true),
        };

        const data = objectOnChange(this._state, this.render.bind(this));

        this.disconnectStore = store(data);
        this.$root.innerHTML = dom.html;

        // context contains methods and properties to work on the element
        this.context = {
          ...methods,
          ...global$Object,
          data,
          el: this.$root,
          prop: this._state.prop,
          $store: configuration.$store,
        };

        // Bind events
        bindEvents(this.$root, { ...this.context, __$bindInput });

        // Bind all the exports methods so it can be accessed in the element
        bindPublicMethodsToContext(this, methods, this.context);

        // Initial setup + first rendering
        this.render(true);

        configuration.created.call(this.context);
      }

      /**
       * When element is removed
       * @returns {void}
       */
      disconnectedCallback() {
        configuration.removed.call(this.context);
        this.disconnectStore();
      }

      /**
       * Getter data
       * @returns {object} immutable object
       */
      get data() {
        return freeze(this._state);
      }
    }
  );

  return customElement;
}
