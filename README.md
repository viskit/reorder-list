# viskit-reorder-list

reorder list web component

see https://github.com/viskit/viskit-reorder

![](https://raw.githubusercontent.com/viskit/viskit-reorder-list/main/show.gif)

# Install

    npm i @viskit/viskit-reorder-list

# Use

```html
<viskit-reorder-list draggableClass="draggable">
  <viskit-reorder>
    <div>item a</div>
    <div>item b</div>
    <div>item c</div>
    <div>item d</div>
  </viskit-reorder>
</viskit-reorder-list>

<script>
  document
    .querySelector("viskit-reorder")
    .addEventListener("onDrop", ({ detail: { complete } }) => {
      complete(true);
    });
</script>
```

# License

MIT
