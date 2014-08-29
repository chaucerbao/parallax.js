var Parallax = (function(window, document) {
  'use strict';

  var watch = [],
    isInitialized = false;

  var init = function() {
    window.addEventListener('scroll', render);
  };

  /* Add an element to the watch list */
  var bind = function(element, speed) {
    if (!isInitialized) {
      init();
      isInitialized = true;
    }

    watch.push({
      element: element,
      speed: speed
    });
  };

  /* Calculate the background position offset for each element on the watch list */
  var render = function() {
    var element, speed, offset, y;

    for (var i = 0, length = watch.length; i < length; i++) {
      element = watch[i].element;
      speed = watch[i].speed;
      offset = window.pageYOffset - element.offsetTop;

      if (offset < 0) {
        y = 0;
      } else if (offset > element.offsetHeight) {
        y = element.offsetHeight / speed;
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
