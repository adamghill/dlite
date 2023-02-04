# Initialize

`dlite` turns HTML into composable, fully compliant `Web Component`s. The easiest way to initialize `dlite` is via an `ES Module` import.

```{warning}
Make sure to specify `module` for the `script` element's `type` attribute.
```

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  const componentOptions = {};
  Dlite(componentOptions);
</script>
```

or

```html 
<script type="module" src="dlite.es.js"></script>
```

## Configuration

`Dlite` initialization accepts one argument which is either a [configuration object](configuration.md) or an array of [configuration objects](configuration.md).

### Object

```js
Dlite({
  tagName: 'component-x',
  template: '...'
});
```

### Array of objects

Initializes multiple components at once.

```js
const componentOne = {
  tagName: 'component-one',
  template: '...',
};
const componentTwo = {
  tagName: 'component-two',
  template: '...',
};

Dlite([componentOne, componentTwo]);
```

#### Shared configuration

When using an array of configuration objects, a shared configuration object can also be passed-in.

```js
const componentOne = {
  tagName: 'component-one',
  template: '...',
};
const componentTwo = {
  tagName: 'component-two',
  template: '...',
};

Dlite([
  componentOne,
  componentTwo,
], {
  created() {
    console.log(`This will log when each component gets created`);
  },
});
```

## Custom element

[`Custom Element`s](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) are created by a custom element tag which can be reused in multiple places. It also allows you to place your component in an external JavaScript file.

Requires a `tagName` and `template` to be set in the configuration.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    tagName: 'hello-world',
    template: `Hello {this.world} {this.prop.name}!`,
    data: {
      world: 'World'
    }
  });
</script>

<!-- Hello World Mardix -->
<hello-world name='Mardix'></hello-world>

<!-- Hello World Sebastien -->
<hello-world name='Sebastien'></hello-world>
```

## In-place element

Use an existing DOM element and make it reactive.

Requires `el`, a query selector, in the configuration to find an element in the HTML.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    el: '#app',
    data: {
      world: 'World'
    }
  });
</script>

<template id="app">
  <!-- Hello World -->
  Hello {this.world}
</template>
```

````{warning}
Setting a `template` key with the `el` will always override the `innerHTML` of the selected element.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    el: '#app',
    template: `See ya {this.world}`,
    data: {
      world: 'World'
    }
  });
</script>

<template id="app">
  <!-- See ya World -->
  Hello {this.world}
</template>
```
````

#### Prevent flickering

`template` tags are not rendered by browsers normally, so they are useful to prevent the flickering effect when an element is initially rendered before it is merged with the data.

If another element tag other than `template` must be used, either add a [`hidden` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden) to the element or [`style="visibility: hidden"`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility).

The `hidden` attribute will make the component invisible and will not include it in the layout. It is basically the same as doing a `display: none` style.

```html
<!-- `hidden` attribute  -->
<div id="app" hidden>
  <p>Hello {this.name}</p>
</div>
```

The `visibility: hidden` style will make the component invisible, but will still affect the layout -- this is beneficial to prevent elements from shifting as much. This is what `dlite` does by default when rendering non in-place elements.

```html
<!-- `visibility: hidden` style -->
<div id="app" style="visibility: hidden">
  <p>Hello {this.name}</p>
</div>
```
