var Parallax = (function(window, document) {
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

    if (!elements.length) { elements = [elements]; }
    for (var i = 0, length = elements.length; i < length; i++) {
      /* Calculate anchor position */
      switch (options.anchor) {
        case 'top': options.anchor = 0; break;
        case 'center': case 'middle': options.anchor = .5; break;
        case 'bottom': options.anchor = 1; break;
        default: options.anchor = parseFloat(options.anchor);
      }

      /* Calculate viewport coordinate */
      switch (options.viewport) {
        case 'top': options.viewport = 0; break;
        case 'center': case 'middle': options.viewport = .5; break;
        case 'bottom': options.viewport = 1; break;
        default: options.viewport = parseFloat(options.viewport);
      }

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
    var element, options, anchor, viewport, offset, y;

    for (var i = 0, length = watchList.length; i < length; i++) {
      element = watchList[i].element;
      options = watchList[i];

      anchor = element.offsetTop + element.offsetHeight * options.anchor;
      viewport = window.pageYOffset + window.innerHeight * options.viewport;

      offset = viewport - anchor;
      if (offset < 0) {
        /* Not at the activation point yet */
        y = 0;
      } else if (window.pageYOffset > element.offsetTop + element.offsetHeight) {
        /* Element has now scrolled past the top of the screen */
        continue;
      } else {
        y = offset * (1 - options.scale);
      }

      element.style.backgroundPosition = '0 ' + y + 'px';
    }
  };

  return {
    bind: bind
  };
})(window, document);

window.parallax = Parallax;
