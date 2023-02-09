# Template

`dlite` uses an HTML-based template syntax that declaratively binds the rendered DOM to the component’s data.

## Interpolation

Access `data` in HTML templates via `this.{data-property-name}`.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    el: '#app',
    data: {
      name: 'dlite'
    },
    created() {
      this.data.todaysDate = new Date().toLocaleString();
    },
  });
</script>

<template id="app">
  <p>Hello {this.name}</p>
  <p>Date: {this.todaysDate}</p>
</template>
```

## Scoped CSS

Components are created as `Custom Elements` which are attached to a `Shadow DOM` by default. The `Shadow DOM` provides encapsulation for the component so that it will not be affected by page CSS. The component can include a `style` tag which will affect just that component.

:::{code} html
:force: true
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    el: '#app',
    created() {
      this.data.todaysDate = new Date().toLocaleString();
    },
  });
</script>

<style>
  h1 {
    red;
  }
</style>

<template id="app">
  <style>
    h1 {
      color: blue;
    }
    </style>

  <h1>This will be blue.</h1>
</template>
:::
