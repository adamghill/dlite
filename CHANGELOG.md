# 0.16.2
- Remove `visibility: hide` on first component render

# 0.16.1
- Include `link` tags with a `rel` of `stylesheet` for `Shadow DOM` scoped css

# 0.16.0
- Scoped CSS when attached to a `Shadow DOM`
- Make `shadowDOM` default `true` (again) now that scoped CSS is working
- Add `debug` setting to show `dlite` error messages on the page while developing
- Include attributes when converting from a regular DOM element to a Web Component
- Return components from `Dlite` initializer for use in JavaScript

## Breaking changes

- Remove `refId` setting because attributes (i.e. `id`) are copied to custom elements and components are now returned from the `Dlite` initializer

# 0.15.0
- Revert `shadowDOM` default back to `false` since that will be less disruptive and a better first experience

# 0.14.0
- Prevent flickering when rendering for all component types (`tagName`, `el`, and in-place elements)
- Attaching components to a `Shadow DOM` is now the default; this will be useful for encapsulation and scoped styles in the future
- Set styles on custom element when on an initial `el`
- Add demo for how to use shared component template
- Switch to `vitest` from `jest` for quicker unit tests

# 0.13.1
- Remove unnecessary files

# 0.13.0
- Rename `litedom` to `dlite`
- Update readme
- Reformat code to reduce package size

# 0.12.1
- Add try/catch to fix wrong type
  
# 0.12.0
- Fixed two way data binding to set initial value
  
# 0.11.2
- Fixed race condition in component-helpers.storeConnector. 

# 0.11.1
- fixed removal of visibility/display if it exist in el to prevent flickering of placeholders

# 0.11.0
- Rename `reliftHTML` to `Litedom`
- Directives use color, instead of r-*. :for, :if, :else, :class, :key
- Remove r-* directives
- Added :class
    `<div :class="clsName:condition; clsName2: condition2"></div>`
    `<div :class="hide: this.item > 5; show-my-ownclass: x === y"></div>`
- Changed options: 
  - If template is provided, it will take precedence over el.innerHTML
  - If tagName provided, it will make it automatically Custom Element 
  - If template is not provided, el.innerHTML will be used
  - Rename isShadow to shadowDOM
  - Added refId: when doing in place element, it will allow to id the element
  - Removed asTemplate
- Add el#.data on the component to expose data
    `<my-counter id=""></my-counter>`
    `document.querySelector('#id').data;`
- Open custom methods to be public in the element when doing document.querySelector('element-something'). 
    To make a method private prefix it with _ underscore.
- Added :key to uniquely identify an element for reordering when looping
- Added :style to dynamically pass inline styling as an object for stylemap
- Fixed other special characters in conditionals
- Update docs

# 0.10.2
- Fixed reported issue when using < + >, it changes it into html entities, &lt; &gt;, i.e. 'this.count > 5' should not be 'this.count &gt; 5'. Fixed.

# 0.10.1
- Fixed rollup bundling error that was re-declaring variable
  
# 0.10.0
- reLiftHTML now accepts array of config, to instantiate multiple components at once.
  `reLiftHTML({...}) or reLiftHTML([{...}, {...}])`

# 0.0.9
- Fixed bug that doesn't remove the element when doing inline

# 0.0.8
- Fixed bug in $store. 
- Put $store in the context
- Make sure $store return the copy of the object

# 0.0.7
- Anonymous Component will be named 'relift-ce-$random-id'
- Added el.style.display=block so hidden can be prepared before compiled. Adding style="display:none" will hide the template so the content is not shown. This option, will then show the element.

# 0.0.6
- Changed the instances to become Web Component (shadow dom or custom element).
  This will allow composability, sharability and use of component in other 
  components.
- Two way data binding (via one way data flow)
  - __$bindInput() function for two way data binding
- Added `utils.get` and `utils.set` to retrive data from dot notation
- Template lit can be written without dollar sign, {...} => ${...}. Specially when being written in JS to prevent interpolation by JS

# 0.0.5
- Initial
