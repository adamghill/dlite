# Initialize

`dlite` turns HTML into composable, fully compliant `Web Component`s. The easiest way to initialize `dlite` is via `ES Modules`.

```{note}
Make sure to specify `module` for the `script` element's `type` attribute.
```

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({});
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
    template: '...',
    tagName: 'component-one'
  };
  const componentTwo = {
    template: '',
    tagName: 'component-two'
  };

  Dlite([componentOne, componentTwo]);
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

Use an existing DOM element and make it reactive. It is not intended to be reused.

Requires an `el` to be set in the configuration.

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

<div id="app">
  <!-- Hello World -->
  Hello {this.world}
</div>
```
