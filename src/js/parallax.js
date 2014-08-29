var Parallax = (function(window, document) {
  'use strict';

  var watchList = [],
    isInitialized = false;

  var init = function() {
    window.addEventListener('scroll', render);
  };

  /* Add an element to the watch list */
  var bind = function(elements, scale) {
    if (!isInitialized) {
      init();
      isInitialized = true;
    }

    if (!elements.length) { elements = [elements]; }
    for (var i = 0, length = elements.length; i < length; i++) {
      watchList.push({
        element: elements[i],
        scale: scale
      });
    }
  };

  /* Calculate the background position offset for each element in the watch list */
  var render = function() {
    var element, scale, offset, y;

    for (var i = 0, length = watchList.length; i < length; i++) {
      element = watchList[i].element;
      scale = watchList[i].scale;
      offset = window.pageYOffset - element.offsetTop;

      if (offset < 0) {
        y = 0;
      } else if (offset > element.offsetHeight) {
        continue;
      } else {
        y = offset * (1 - scale);
      }

      element.style.backgroundPosition = '0 ' + y + 'px';
    }
  };

  return {
    bind: bind
  };
})(window, document);

window.parallax = Parallax;
