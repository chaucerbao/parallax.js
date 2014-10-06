var Parallax = (function(window) {
  'use strict';

  var watchList = [], isInitialized = false;

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
      speed: 1,
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
        speed: options.speed,
        anchor: options.anchor,
        viewport: options.viewport,
        yInit: yPos(elements[i])
      });
    }
  };

  /* Calculate the background position offset for each element in the watch list */
  var render = function() {
    var element, params, anchor, viewport, position, y, elementY, visible = [];
    var i, length;

    /* Avoid excessive reflows by reading all properties at once, then batch writing the DOM updates */
    for (i = 0, length = watchList.length; i < length; i++) {
      params = watchList[i];
      element = params.element;

      /* Calculate the absolute anchor/viewport positions */
      var elementTop = offset(element).top;
      anchor = elementTop + element.offsetHeight * params.anchor;
      viewport = window.pageYOffset + window.innerHeight * params.viewport;

      /* If the element is off-screen, don't render it */
      if (elementTop > (window.pageYOffset + window.innerHeight) || (elementTop + element.offsetHeight) < window.pageYOffset) {
        continue;
      }

      y = params.yInit;
      position = viewport - anchor;
      if (position > 0) {
        /* The element's anchor position is past the viewport's activation point */
        y += position * Math.abs(1 - params.speed) * (params.speed < 0 ? -1 : 1);
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

    /* Render the updated positions */
    for (i = 0, length = visible.length; i < length; i++) {
      visible[i].element.style.backgroundPosition = '0 ' + visible[i].y + 'px';
    }
  };

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
      y = element.offsetHeight * parseFloat(y) / 100;
    }

    return parseFloat(y);
  };

  /* Calculate the absolute position of an element */
  var offset = function(element) {
    var left = 0, top = 0;

    if (element.offsetParent) {
      do {
        left += element.offsetLeft;
        top += element.offsetTop;
        element = element.offsetParent;
      } while (element);
    }

    return {
      left: left,
      top: top
    };
  };

  return {
    bind: bind
  };
})(window);

window.parallax = Parallax;
