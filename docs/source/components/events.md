# Events

Add event listeners to elements with an `@{event-name}` attribute and assign it to a [custom method](configuration.md#custom-methods) in the current component. An `Event` will be passed to the method as the only argument.

```{note}
The attribute must be the name of the event without `on`, e.g. `@click` will listen for the `onclick` event.
```

:::{code} html
:force: true
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    el: '#app',
    sayHello(event) {
      console.log('Hello World!')
    }
  })

</script>

<template id="app">
  <a href="#" @click="sayHello">Prints 'Say Hello!' to the console</a>
</template>
:::

## Passing values

Use HTML data attributes to pass data to the event.

:::{code} html
:force: true
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    el: '#app',
    sayHello(event) {
      const name = event.target.getAttribute('data-name');

      console.log(`Hello ${name}!`);
    }
  })
</script>

<template id="app">
  <button @click="sayHello" data-name="Mardix">
    Prints 'Hello Mardix!' to the console
  </button>
</template>
:::

## @call

`@call` is a shortcut that will listen to correct event based on the HTML element type. `@call` will be converted to `@click`, except for the scenarios below.

### `HTMLAnchorElement`

`@call` will get converted to `@click`.

:::{code} html
:force: true
<a @call="someMethodName">Click Me</a>
:::

will get converted to:

:::{code} html
:force: true
<a href="javascript:void(0);" @click="someMethodName">Click Me</a>
:::

### `HTMLInputElement` and `HTMLTextAreaElement`

`@call` will get converted to `@input` + `@paste`.

:::{code} html
:force: true
<input type="text" @call="someMethodName">
:::

will get converted to:

:::{code} html
:force: true
<input type="text" @input="someMethodName" @paste="someMethodName">
:::

### `HTMLSelectElement`

`@call` will get converted to `@change`.

:::{code} html
:force: true
<select @call="someMethodName">
  <option>...</option>
</select>
:::

will get converted to:

:::{code} html
:force: true
<select @change="someMethodName">
  <option>...</option>
</select>
:::

### `HTMLFormElement`

`@call` will get converted to `@submit`.

:::{code} html
:force: true
<form @call="someMethodName">
  ...
</form>
:::

will get converted to:

:::{code} html
:force: true
<form @submit="someMethodName">
  ...
</form>
:::


## All event names

- `@call`
- `@click`
- `@submit`
- `@change`
- `@input`
- `@select`
- `@focus`
- `@blur`
- `@hover`
- `@reset`
- `@keydown`
- `@keypress`
- `@keyup`
- `@dblclick`
- `@mouseenter`
- `@mouseleave`
- `@mousedown`
- `@mousemove`
- `@mouseout`
- `@mouseover`
- `@mouseup`
- `@contextmenu`
- `@drag`
- `@dragend`
- `@dragenter`
- `@dragstart`
- `@dragleave`
- `@drop`
- `@cut`
- `@copy`
- `@paste`
