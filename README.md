# Parallax.js

A parallax library in JavaScript that adjusts an element's background position to create the effect.

## Usage

Use CSS to assign an element's background image
```css
#my-element { background: url(images/background.jpg) no-repeat; height: 250px; }
```

Then, in JavaScript, bind the element to Parallax.js with some options
```javascript
parallax.bind(document.getElementById('#my-element'), { speed: .5 });
```

`parallax.bind(elements[, options]);`

`elements` can be a single element or a collection of elements. `document.getElementById('#my-element')` or `document.querySelectorAll('.parallax')`.

```javascript
// Defaults
options = {
  speed: 1,
  anchor: 'top',
  viewport: 'top'
};
```

`speed` is relative to the visible window. `0` means the background doesn't move during scroll. `1` means the background moves at the same speed of the scroll (as if there was no parallax).
`anchor` and `viewport` can have values of `top`, `center`, `bottom`, or a float between 0 and 1. `anchor` and `viewport` work together to tell Parallax.js when to start working.  Can be read as, "When the element's `anchor` reaches the viewport's `viewport`, then start parallaxin'."
