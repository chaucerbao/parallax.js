var Parallax = (function(window) {
  'use strict';

  var watchList = [],
    isInitialized = false;

  /* Extend an object */
  var extend = function(out) {
    out = out || {};

    for (var i = 1, length = arguments.length; i < length; i++) {
      if (!arguments[i]) { continue; }

      for (var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) { out[key] = arguments[i][key]; }
      }
    }

    return out;
  };

  var init = function() {
    if (!isInitialized) {
      (function renderLoop() {
        window.requestAnimationFrame(renderLoop);
        render();
      })();
      isInitialized = true;
    }
  };

  /* Add an element to the watch list */
  var bind = function(elements, options) {
    init();

    /* Merge the given options with defaults */
    options = extend({
      scale: 1,
      anchor: 'top',
      viewport: 'top'
    }, options);

    /* Convert anchor/viewport values to float */
    options.anchor = toFloat(options.anchor);
    options.viewport = toFloat(options.viewport);

    if (!elements.length) { elements = [elements]; }
    for (var i = 0, length = elements.length; i < length; i++) {
      watchList.push({
        element: elements[i],
        scale: options.scale,
        anchor: options.anchor,
        viewport: options.viewport,
        yInit: yPos(elements[i])
      });
    }
  };

  /* Calculate the background position offset for each element in the watch list */
  var render = function() {
    var element, params, anchor, viewport, position, y, elementY, visible = [];

    /* Avoid excessive reflows by reading all properties at once, then batch writing the DOM updates */
    for (var i = 0, length = watchList.length; i < length; i++) {
      params = watchList[i];
      element = params.element;

      anchor = element.offsetTop + element.offsetHeight * params.anchor;
      viewport = window.pageYOffset + window.innerHeight * params.viewport;

      /* If the element is off-screen, don't render it */
      if (element.offsetTop > (window.pageYOffset + window.innerHeight) || (element.offsetTop + element.offsetHeight) < window.pageYOffset) {
        continue;
      }

      y = params.yInit;
      position = viewport - anchor;
      if (position > 0) {
        /* The element's anchor position is past the viewport's activation point */
        y += position * Math.abs(1 - params.scale) * (params.scale < 0 ? -1 : 1);
      }

      /* Only queue up elements that need to be repositioned */
      elementY = yPos(element);
      if (elementY < Math.floor(y) || elementY > Math.ceil(y)) {
        visible.push({
          element: element,
          y: y
        });
      }
    }

    for (var i = 0, length = visible.length; i < length; i++) {
      visible[i].element.style.backgroundPosition = '0 ' + visible[i].y + 'px';
    }
  };

  /* Convert a text value to its float counterpart */
  var toFloat = function(value) {
    var number;

    switch (value) {
      case 'top': number = 0; break;
      case 'center': case 'middle': number = 0.5; break;
      case 'bottom': number = 1; break;
      default: number = parseFloat(value);
    }

    return number;
  };

  /* Return the y-position in 'px' of an element's background-position */
  var yPos = function(element) {
    var y = window.getComputedStyle(element).getPropertyValue('background-position').split(' ')[1];

    if (y.indexOf('%') > 0) {
      y = element.offsetHeight * parseInt(y) / 100;
    }

    return parseInt(y);
  }

  return {
    bind: bind
  };
})(window);

window.parallax = Parallax;
