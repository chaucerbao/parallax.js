# Parallax.js

A Javascript parallax library that adjusts an element's background position on scroll.

## Usage

`parallax.bind(element[, options]);`

```javascript
// Defaults
options = {
  scale: 1,
  anchor: 'top',
  viewport: 'top'
};
```

`scale` of `1` means the background position scrolls like normal, `0` means the background doesn't move.
`anchor` and `viewport` can have values of `top`, `center`, `bottom`, or a float between 0 and 1, inclusive.
Note: `anchor` and `viewport` work together to tell Parallax.js when to start the effect.  When the element's `anchor` reaches the viewport's `viewport` position, then start parallaxing.

Example:
```javascript
parallax.bind(document.getElementById('#my-element'), { scale: .5 });
```
