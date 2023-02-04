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

export default function Component(options = {}) {
  const opt = {
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
     * @type {any}
     */
    ...options,
  };

  const store = storeConnector(opt.$store);
  const dom = domConnector(opt.template);
  const methods = filterMethods(opt);
  const initialState = filterInitialState(opt.data);
  const computedState = filterComputedState(opt.data);
  const global$Object = filterGlobal$Object(opt);

  /**
   * @type {function} update the computed states
   */
  const updateComputedState = (state) => computedState.forEach((s) => s(state));

  /**
   * Define and Register the WebComponent
   */
  window.customElements.define(
    opt.tagName.toLowerCase(),
    class extends HTMLElement {
      constructor() {
        super();

        this.$el = this;

        // Hide the `Custom Element` until it's rendered
        this.style.visibility = !this.style.visibility
          ? "hidden"
          : this.style.visibility;

        /**
         * @type {HTMLElement|ShadowRoot}
         * Attach to a Shadow DOM or just stay a `Custom Element`
         */
        this.$root = opt.shadowDOM ? this.attachShadow({ mode: "open" }) : this;
      }

      /**
       * When element is added
       * @returns {void}
       */
      connectedCallback() {
        this._state = {
          ...this._state,
          ...initialState,
          prop: getAttrs(this, true),
        };

        const data = objectOnChange(this._state, () => {
          updateComputedState(this._state);

          if (dom.render(this.$root, { ...this._state, ...renderContext })) {
            opt.updated.call(this.context);
          }

          // Make the `Custom Element` visible now that it's been rendered
          this.$el.style.visibility =
            this.$el.style.visibility === "hidden"
              ? "visible"
              : this.$el.style.visibility;
        });

        this.disconnectStore = store(data);
        this.$root.innerHTML = dom.html;

        // context contains methods and properties to work on the element
        this.context = {
          ...methods,
          ...global$Object,
          data,
          el: this.$root,
          prop: this._state.prop,
          $store: opt.$store,
        };

        // Bind events
        bindEvents(this.$root, { ...this.context, __$bindInput });

        // Bind all the exports methods so it can be accessed in the element
        bindPublicMethodsToContext(this, methods, this.context);

        // Initial setup + first rendering
        updateComputedState(this._state);

        dom.render(this.$root, { ...this._state, ...renderContext });

        opt.created.call(this.context);
      }

      /**
       * When element is removed
       * @returns {void}
       */
      disconnectedCallback() {
        opt.removed.call(this.context);
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
}
