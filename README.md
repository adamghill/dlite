<p align="center">
  <a href="https://dlitejs.com/"><img src="logo.svg" alt="dlite logo" height="80"/></a>
</p>
<h1 align="center"><a href="https://dlitejs.com/">dlite</a></h1>
<p align="center">A tiny, blazing fast view library that creates reactive Web Components</p>

![npm (tag)](https://img.shields.io/npm/v/dlite/latest.svg?style=flat-square) [![gzip bundle size](http://img.badgesize.io/https://unpkg.com/dlite@latest/dist/dlite.es.js?compression=gzip&style=flat-square)](https://unpkg.com/dlite) ![NPM](https://img.shields.io/npm/l/dlite.svg?style=flat-square) ![GitHub Sponsors](https://img.shields.io/github/sponsors/adamghill?color=blue&style=flat-square)

## 📖 Complete documentation

https://dlitejs.com

## 🧐 Introduction

`dlite` creates `Web Components` and interactive web pages easily without the bloat of big frameworks. It can be effortlessly added into existing HTML pages to create reusable components for web applications. `dlite` is perfect for simple, but dynamic static sites or when you want to progressively upgrade a site without changing too much.

## ⭐ Features

- Seriously tiny: **<10 kB** (**<5 kB** when gzipped)
- No dependencies, no virtual DOM, no JSX, and no build tool required
- Reactive Web Components
- Progressive template language that leverages `template literals`
- Props support
- Computed properties
- Two-way data binding
- Events handling
- Component lifecycle hooks
- Directives (e.g. `if`/`else`, `for`, `style`, `class`)
- Shadow DOM by default with scoped CSS
- Put a script tag in your HTML and _go_ ⚡

It is compatible with all modern browsers that support [`ES2015`/`ES6`](https://caniuse.com/#feat=es6), [`ESM`](https://caniuse.com/?search=esm), and [`Proxy`](https://caniuse.com/#search=proxy).

## 🔧 Installation

The easiest way to use `dlite` is with a script tag.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';
</script>
```

More [details about installation](https://dlitejs.com/installation/).

## 🔄 Canonical counter example

An example counter component to give you a sense of what `dlite` looks like. See more [examples](https://dlitejs.com/examples/).

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';
  
  Dlite({
    el: '#app',
    data: {
      count: 0
    },
    up() {
      this.data.count++;
    },
    down() {
      this.data.count--;
    }
  });
</script>

<template id="app">
  <h1>{this.count}</h1>

  <div>
    <button @click="down">Decrease Count</button>
    <button @click="up">Increase Count</button>
  </div>
</template>
```

## 🙋 FAQ

See the whole FAQ at https://dlitejs.com/faq/.

## 🧠 Related projects

Similar projects to `dlite` are listed on https://unsuckjs.com/.

## 🙌 Acknowledgements

`dlite` is forked from the fantastic work done by [Mardix](https://github.com/mardix) with [Litedom](https://github.com/mardix/litedom).

It includes code from these great libraries:
- https://github.com/bryhoyt/emerj 
- https://github.com/sindresorhus/on-change

The lightbulb logo is provided from https://openmoji.org/library/emoji-1F4A1/.
