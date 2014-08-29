# Parallax.js

A Javascript parallax library that adjusts an element's background position on scroll.

## Usage

`parallax.bind(element, scale);`

`scale` of `1` means the background position scrolls like normal, `0` means the background doesn't move.

Example:
```javascript
parallax.bind(document.getElementById('#my-element'), .5);
```
