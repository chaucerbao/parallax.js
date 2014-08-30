# Parallax.js

A Javascript parallax library that adjusts an element's background position on scroll.

## Usage

Use CSS to assign an element a background image
```css
#my-element { background: url(images/background.jpg) no-repeat; width: 250px; }
```

Then, in javascript, bind the element to Parallax.js with some options
```javascript
parallax.bind(document.getElementById('#my-element'), { scale: .5 });
```

`parallax.bind(elements[, options]);`

`elements` can be a single element or a collection of elements. `document.getElementById('#my-element')` or `document.querySelectorAll('.parallax')`.

```javascript
// Defaults
options = {
  scale: 1,
  anchor: 'top',
  viewport: 'top'
};
```

`scale` of `1` means the background position scrolls like normal, `0` means the background doesn't move.
`anchor` and `viewport` can have values of `top`, `center`, `bottom`, or a float between 0 and 1. `anchor` and `viewport` work together to tell Parallax.js when to start working.  Can be read as, "When the element's `anchor` reaches the viewport's `viewport`, then start parallaxin'."
