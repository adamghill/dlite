# dlite

![npm (tag)](https://img.shields.io/npm/v/dlite/latest.svg?style=flat-square) [![gzip bundle size](http://img.badgesize.io/https://unpkg.com/dlite@latest/dist/dlite.es.js?compression=gzip&style=flat-square)](https://unpkg.com/dlite) ![NPM](https://img.shields.io/npm/l/dlite.svg?style=flat-square)

![logo](logo.svg)

## 📖 Full documentation

https://dlitejs.com

## Introduction

`dlite` creates `Web Components` and interactive web pages easily without the bloat of big frameworks. It can be effortlessly added into existing HTML pages and to add components throughout a web application. `dlite` is perfect for developers working on simple, but dynamic static sites or when you want to progressively upgrade your site without changing too much.

## ⭐ Features

- Seriously tiny: **~3.5kb** when gzipped
- Reactive Web Components
- Internal state manager
- Progressive templating language that leverages `template literals`
- Props
- Lifecycle
- State management
- Computer properties
- One-way data flow
- Two-way data binding and events handling
- Component lifecycle hooks
- Directives (e.g. `if`/`else`, `for`, `style`, `class`)
- No dependencies, no virtual DOM, no JSX, and no build tool required -- put a script tag in your HTML and _go_

It is compatible with all modern browsers that support [`ES2015`/`ES6`](https://caniuse.com/#feat=es6), [`ESM`](https://caniuse.com/?search=esm), and [`Proxy`](https://caniuse.com/#search=proxy).

## 🔧 Installation

The easiest way to use `dlite` is within a script tag.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';
  
  ...
</script>
```

You can also install via NPM.

```
npm install dlite
```

```js
import Dlite from 'dlite';
```

## 🔄 Canonical counter example

An example counter component to give you a sense of what `dlite` looks like. Many more examples are in the [full documentation](https://dlitejs.com).

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

<div id="app">
  <h1>{this.count}</h1>

  <div>
    <button @click="down">Decrease Count</button>
    <button @click="up">Increase Count</button>
  </div>
</div>
```

More examples at https://dlitejs.com.

## 🙋 FAQ

### How big is `dlite`?

`dlite` is **~3.5kB** when gzipped.

### Why yet another JavaScript library?

Why not?! 😉

_A real answer from the original author of `Litedom`:_

[Mardix is] an UI Tech Lead Application Engineer at Bank of America, who deals with many static sites, and see how stuff can sometimes be frustrating for team members when it come to choices. 

So, one week-end afternoon (4/20 weekend 2019 :), while working on a personal project using a static site generator, I thought it was way too much of an overhead to bring in something like Vue, React or Angular, just to make a small piece reactive on the personal static site. 

So [Mardix] decided to create Litedom, to just be a simple drop-in view library that can make any sections of the site reactive without the overhead. [Mardix] wanted... HTML to stay as is. No React, no Vue, just... HTML and me.

### Does it replace React, Vue etc?

Not really. `dlite` is targeting a different set of applications, small web apps or static sites. Some times you just want a little bit of reactivity without including a huge library. It follows the same paradigms as Vue.js, just on a much smaller scale.

### Does size _really_ matter?

For JavaScript libraries, yes. The less JavaScript to download and parse, the faster your site will render. Ipso facto, your users will be happier and the world will be a better place.

### Who created this?

[Mardix](https://github.com/mardix) created [Litedom](https://github.com/mardix/litedom) although it hasn't been updated since 2019. [adamghill](https://github.com/adamghill) tried it out in 2023 and was so impressed by the approach he wanted to improve it. He decided to hard fork it, fix bugs, update the code, re-write the docs, and re-brand the library so that it can get more ❤️.

## 🙌 Acknowledgements

`dlite` is forked from the fantastic work done by [Mardix](https://github.com/mardix) with [Litedom](https://github.com/mardix/litedom).

It also includes some code from these great libraries:
- https://github.com/bryhoyt/emerj 
- https://github.com/sindresorhus/on-change

Logo: https://openmoji.org/library/emoji-1F4A1/
