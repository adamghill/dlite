# Data Binding

The `@bind` attribute creates two-way data bindings on `input`, `textarea`, and `select` elements. Bound elements will update the appropriate `data` on input events.

:::{code} html
:force: true
<script type="module">
  import Dlite from '//unpkg.com/dlite';

  Dlite({
    el: `#app`,
    data: {
      name: '',
      salutation: '',
    },
  });
</script>

<div id="app">
  <p>
    Hello {this.salutation} {this.name}
  </p>

  <div>
    <input type="radio" name="salutation" @bind="salutation" value="Mr.">
    <input type="radio" name="salutation" @bind="salutation" value="Ms.">
  </div>
  <div>
      <input type="text" name="name" @bind="name">
  </div>
</div>
:::
