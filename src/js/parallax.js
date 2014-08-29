var Parallax = (function(window, document) {
  'use strict';

  var watchList = [],
    isInitialized = false;

  var init = function() {
    window.addEventListener('scroll', render);
  };

  /* Add an element to the watch list */
  var bind = function(elements, speed) {
    if (!isInitialized) {
      init();
      isInitialized = true;
    }

    if (!elements.length) { elements = [elements]; }
    for (var i = 0, length = elements.length; i < length; i++) {
      watchList.push({
        element: elements[i],
        speed: speed
      });
    }
  };

  /* Calculate the background position offset for each element in the watch list */
  var render = function() {
    var element, speed, offset, y;

    for (var i = 0, length = watchList.length; i < length; i++) {
      element = watchList[i].element;
      speed = watchList[i].speed;
      offset = window.pageYOffset - element.offsetTop;

      if (offset < 0) {
        y = 0;
      } else if (offset > element.offsetHeight) {
        continue;
      } else {
        y = offset / speed;
      }

      element.style.backgroundPosition = '0 ' + y + 'px';
    }
  };

  return {
    bind: bind
  };
})(window, document);

window.parallax = Parallax;
