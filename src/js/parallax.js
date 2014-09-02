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
    window.addEventListener('scroll', render);
  };

  /* Add an element to the watch list */
  var bind = function(elements, options) {
    if (!isInitialized) {
      init();
      isInitialized = true;
    }

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
        viewport: options.viewport
      });
    }
  };

  /* Calculate the background position offset for each element in the watch list */
  var render = function() {
    var element, params, anchor, viewport, position, y;

    for (var i = 0, length = watchList.length; i < length; i++) {
      params = watchList[i];
      element = params.element;

      anchor = element.offsetTop + element.offsetHeight * params.anchor;
      viewport = window.pageYOffset + window.innerHeight * params.viewport;

      position = viewport - anchor;

      if (element.offsetTop > (window.pageYOffset + window.innerHeight) || (element.offsetTop + element.offsetHeight) < window.pageYOffset) {
        /* Element is off the screen, so no need to render */
        continue;
      } else if (position < 0) {
        /* Not at the activation point yet */
        y = 0;
      } else {
        y = position * (1 - Math.abs(params.scale)) * ((params.scale < 0) ? -1 : 1);
      }

      element.style.backgroundPosition = '0 ' + y + 'px';
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

  return {
    bind: bind
  };
})(window);

window.parallax = Parallax;
