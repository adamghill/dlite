# Template

`dlite` uses an HTML-based template syntax that declaratively binds the rendered DOM to the components’s data.

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

<div id="app">
  <p>Hello {this.name}</p>
  <p>Date: {this.todaysDate}</p>
</div>
```
