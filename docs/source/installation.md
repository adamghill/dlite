# Installation

## Browser

The easiest way to use the latest version of `dlite` is with a script tag and using the `unpkg` CDN.

```{warning}
Make sure to specify `module` for the `script` element's `type`.
```

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite';
</script>
```

You can also specify a version using the `unpkg` CDN to minimize the effect of breaking changes.

```html
<script type="module">
  import Dlite from '//unpkg.com/dlite@0.16.1';
</script>
```

## NPM

You can also install via <a href="https://npmjs.com">NPM</a>.

```shell
npm install dlite
```

Then, import `dlite` in your JavaScript.

```js
import Dlite from 'dlite';
```
