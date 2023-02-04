# Directives

Directives are HTML element attributes that start with a `:`. They are shortcuts for logic in the template. 

```html
<span :if="this.index === 5">Show me</span>
```

will get converted to the following JavaScript:

```js
${this.index === 5 ? `<span>Show me</span>` : ``}
```

```{note}
Directive values can be any JavaScript conditional. `${...}` or `{...}` are not necessary inside of the directive -- it should be written as a normal string.
```

## if

`:if` and `:else` can be used to conditionally add or remove the element.

The element with the `:else` must immediately follow the element with the `:if` directive otherwise it will not be recognized.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    el: '#app',
    data: {
      show: true,
      count: 5,
    },
  });
</script>

<template id="app">
  <div :if="this.count !== 5">The count is not {this.count}</div>

  <div :if="this.show">this.data.show is true</div>
  <div :else>this.data.show is false</div>
</template>
```

## for

`:for` iterates over a list of items.

```{note}
Under the hood `for` converts the array into a `map`.
```

The `:for` directive requires a special syntax in the form of `item in items`, where `items` is the source data and `item` is the current object in the iteration.

You can also use `item, index in items`, where `index` tracks the loop index.

```{note}
It is recommended to provide a `:key` directive or `id` attribute with `:for` whenever possible.
```

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    el: '#app',
    data: {
      locations: [{
          name: 'Charlotte'
        }, {
          name: 'Atlanta'
        }, {
          name: 'Concord'
        },
      ],
    },
  });
</script>

<template id="app">
  <ul>
    <li :for="location, index in this.locations" :key="location-{index}">{location.name}</li>
  </ul>
</template>
```

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    el: '#app',
    data: {
      states: [{
        name: 'NC',
        cities: [
          'Concord',
          'Charlotte',
          'Raleigh'
        ],
      }, {
        name: 'Florida',
        cities: [
          'Tampa',
          'Miami',
          'Jacksonville'
        ],
      }, {
        name: 'South Carolina',
        cities: [
          'Columbia',
          'Greenville'
        ],
      }],
    },
  });
</script>

<template id="app">
  <ul>
    <li :for="state in this.states">
      <p>
        {state.name}
      </p>

      <ul>
        <li>Cities</li>
        <li :for="city in state.cities">{city}</li>
      </ul>
    </li>
  </ul>
</template>
```

## class

`:class` conditionally toggles class names.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    data: {
      count: 0,
    },
  });
</script>

<style>
  .blue {
    color: blue
  }
  .blue {
    color: red
  }
</style>

<div :class="red: this.count === 7; blue: this.count === 10">
  - will have .red if count is 7
  - will have .blue if count is 10
</div>
```

## style

`:style` sets element styles.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    data: {
      customStyle: {
        backgroundColor: 'red',
        display: 'none',
        'font-size': '12px;'
      },
    },
  });
</script>

<div :style="this.customStyle"></div>

// will get converted to

<div style="background-color: red; display: none; font-size: 12px"></div>
```

## text

`:text` sets the text of the element.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    data: {
      text: 'this is some text'
    },
  });
</script>

<div :text="this.text"></div>

// will get converted to

<div>this is some text</div>
```
