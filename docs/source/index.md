# Introduction

`dlite` creates `Web Components` and interactive web pages easily without the bloat of big frameworks. It can be effortlessly added into existing HTML pages to create reusable components for web applications. `dlite` is perfect for simple, but dynamic static sites or when you want to progressively enhance a site without changing too much HTML.

The [code](https://github.com/adamghill/dlite) is licensed as MIT. PRs and bug reports with failing tests are extremely appreciated.

## ⭐ Features

- Seriously tiny: **~3.6kB** when gzipped
- Reactive web components
- Internal state manager
- Progressive template language that leverages `template literals`
- Props support
- Lifecycle methods
- State management
- Computed properties
- One-way data flow
- Two-way data binding
- Events handling
- Component lifecycle hooks
- Directives (e.g. `if`/`else`, `for`, `style`, `class`)
- Can attach to a Shadow DOM
- No dependencies, no virtual DOM, no JSX, and no build tool required
- Put a script tag in your HTML and _go_ ⚡

It is compatible with all modern browsers that support [`ES2015`/`ES6`](https://caniuse.com/#feat=es6), [`ESM`](https://caniuse.com/?search=esm), and [`Proxy`](https://caniuse.com/#search=proxy).

## 🧠 Related projects

Similar projects to `dlite` are listed on https://unsuckjs.com/.

## 🙌 Acknowledgements

`dlite` is forked from the fantastic work done by [Mardix](https://github.com/mardix) with [Litedom](https://github.com/mardix/litedom).

It includes code from these great libraries:
- https://github.com/bryhoyt/emerj 
- https://github.com/sindresorhus/on-change

Logo: https://openmoji.org/library/emoji-1F4A1/

```{toctree}
:maxdepth: 2
:hidden:

self
installation
faq
examples
```

```{toctree}
:caption: Components
:maxdepth: 2
:hidden:

components/index
components/configuration
components/template
components/binding
components/directives
components/events
components/store
```

```{toctree}
:caption: Misc
:maxdepth: 2
:hidden:

GitHub <https://github.com/adamghill/dlite>
Sponsor <https://github.com/sponsors/adamghill>
```
