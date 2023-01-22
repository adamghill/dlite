# Examples

## Props

A custom element can be created which uses props.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';
  
  Dlite({
    tagName: 'hello-world',
    template: 'Hello {this.prop.name}!'
  });
</script>

<!-- Will display 'Hello World!' -->
<hello-world name="World"></hello-world>
```

## [Lifecycle](components/configuration.md#methods)

The `created` function will be called when the component is initialized. `removed` will be called when the component is removed.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    // custom tag name
    tagName: 'counter',
    // string that will replace the counter component
    template: `Counting: {this.count}`,
    // reactive data
    data: {
      count: 0
    },
    created() {
      // get `this.prop.start` from the attribute
      this.data.count = this.prop.start || 0;

      // will increment `this.data.count` every second
      setInterval(_=> {
        this.data.count++;
      }, 1000)
    },
    updated() {
      console.log('Component is updated')
    }
    removed() {
      console.log('Component is removed')
    }
  });
</script>

<!-- the count will start at 5 and count up by 1 every second -->
<counter start=5></counter>

<!-- the count will start at 21 and count up by 1 every second -->
<counter start=21></counter>
```

## In-place template

Use the content of the HTML element as the template and create the component in place.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    // The target element
    el: '#helloWidget',
    // The reactive data
    data: {
      name: 'dlite'
    }
  });
</script>

<div id="helloWidget">
  <div>Hello {this.name}</div>
  <div>Today's date: {new Date().toISOString().slice(0, 10)}</div>
</div>
```

## Access custom element from JavaScript

Interact with an element externally.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    // custom tag name
    tagName: 'counter',
    // template
    template: `Counting: {this.count}`,
    // reactive data
    data: {
      count: 0
    },
    increment() {
      this.data.count++;
    },
    decrement() {
      this.data.count--;
    },
  });

  const el = document.querySelector('#counter1');

  // show the component data
  console.log('data', el.data);

  // increment the count
  el.increment();

  // decrement the count
  el.decrement();

  // the `removed` method will be executed
  el.remove();
</script>

<!-- the count will start at 5 -->
<counter id="counter1" start=5></counter>
```

## [Directives](components/directives.md)

`if`, `else`, `for` loops, `style` map, `class`, `key`, `text`, and `value` directives help implement logic in your components.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    el: '#container',
    // reactive data
    data: {
      count: 0,
      cars: ['BMW', 'Mercedes', 'Audi', 'Tesla'],
      style: {
        color: 'red',
        background: 'yellow'
      }
    },
    created() {
      this.data.count = 0;

      setInterval((_) => {
        this.data.count++;
      }, 1000);
    }
  });
</script>

<style>
  .blue {
    color: blue
  }
  .red {
    color: red
  }
</style>

<div id="container">
  <div>Counting {this.count}</div>

  <!-- if/else -->
  <div :if="this.count > 10">The count is greater than 10</div>
  <div :else>The count is less than 10</div>

  <!-- for loop -->
  <ul>
    <li :for="car in this.cars">{car}</li>
  </ul>

  <!-- style map -->
  <div :style="this.style">
    The background will be yellow, the font will be red
  </div>

  <!-- class -->
  <div :class="blue: this.count === 7; red: this.count === 10">
    Will have .blue if count is 7, 
    will then have .red when count is 10
  </div>
</div>
```

## [Two-way data binding](components/binding.md) and [computed data](components/configuration.md#data)

:::{code} html
:force: true
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    el: '#container',
    data: {
      name: '',
      lastName: '',
      fullName(state) {
        return `${state.name} ${state.lastName}`
      }
    }
  });
</script>

<div id="container">
  Hello {this.name}. Your full name is {this.fullName}.

  <!-- two-way binding to data.name -->
  <div>
    <input type="text" @bind="name">
  </div>

  <!-- two-way binding to data.lastName -->
  <div>
    <input type="text" @bind="lastName">
  </div>
</div>
:::

## [Event handling](components/events.md)

Associate element events to JavaScript methods.

:::{code} html
:force: true
<script type="module">
  import Dlite from '//unpkg.com/dlite';
  
  Dlite({
    el: '#counter',
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

<div id="counter">
  <h4>{this.count}</h4>

  <div>
    <button @click="down">Decrement count</button>
    <button @click="up">Increment count</button>
  </div>
</div>
:::

### Nested components

Nest a component inside another component.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';
  
  const circleComponent = {
    tagName: 'comp-circle',
    template: `
      <div class="circle">
        <span></span>
      </div>
    `,
    created() {
      this.el.querySelector('div').style.backgroundColor = this.prop.color;
    }
  }

  const mainComponent = {
    el: '#mainComponent',
    data: {
      colors: [
        '#ff0000',
        '#00ff00',
        '#ffff00'
      ]
    }
  }

  // Initialize both components
  Dlite([mainComponent, circleComponent]);
</script>

<style style type="text/css">
  .circle {           
    border: thin solid black;
    border-radius: 60px;
    width:100px;
    height:100px;
    text-align: center;
    margin-bottom: 10px;
  }
</style>

<div id="mainComponent">
  <comp-circle 
    :for="color, index in this.colors" 
    :key="{index}" 
    color="{color}">
  </comp-circle>
</div>
```
