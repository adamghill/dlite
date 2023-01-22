# Store

To share state with multiple instances, it's recommended to use a state manager such as Redux or [Litestate](https://github.com/mardix/litestate).

````{note}
The store must implement the following methods.

- `getState()`: Returns the full state of the store.
- `subscribe(callback: function)`: A subscription method that will execute when the state is updated.

If the state manager doesn't provide these methods by default, it is possible to extend it. 

```js
const myStateManager = new someStore()

// Now the store contains getState() and subscribe(callback)
const store = {
  getState() {
      return myStateManager.state;
  },
  subscribe(callback) {
      return myStateManager.onChange(callback);
  },
  ...myStateManager
}
```
````

## Setup

```js
Dlite({
  el: '#app',
  $store: STORE_INSTANCE,
});
```

## Access the store

### JavaScript

The store is available in methods via `this.$store`.

```js
Dlite({
  el: '#app',
  $store: STORE_INSTANCE,
  doSomething() {
    this.$store.doSomething();
  },
});
```

### Template

To access the store `this.$store` will return the values from `$store.getState()`.

```html
<div id="app">
  {this.$store.fullName}
</div>
```

## Example with `Litestate`

:::{code} html
:force: true
<script type="module">
  import Litedom from '//unpkg.com/litedom';
  import Litestate from '//unpkg.com/litestate';

  const store = Litestate({
    state: {
      name: '',
      lastName: '',
      fullName: (state) => `${state.name} ${state.lastName}`,
      accountDetails: []
    },
    setName(state, name) {
      state.name = name;
    },
    setLastName(state, lastName) {
      state.lastName = lastName;
    },
    async loadAccount(state) {
      state.status = 'loading';
      const res = await fetch(url);
      const data = await res.json();

      // will be shared as this.$store.accountDetails
      state.accountDetails = data;

      state.status = 'done';
    }
  });

  Dlite([{
    el: '#appOne',
    $store: store,
    loadAccount() {
      this.$store.doSomething();
    }
  }, {
    el: '#appTwo',
    $store: store
  }, ]);
</script>

<div id="appOne">
  Hello {this.$store.fullName}!
  <button @call="loadAccount">Load Account</button>
</div>

<div id="appTwo">
  <ul>
    <li :for="item in this.$store.accountDetails">{accountName}</li>
  </ul>
</div>
:::
