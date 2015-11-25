import Ripple from './ripple.js';

(()  => {

  const item = document.querySelector('li.default');

  Ripple(item, {
    background: 'red',
    duration: '2s'
  });

})();

(()  => {

  const item = document.querySelector('li.trigger');

  const ripple = Ripple(item, {
    background: 'blue',
    duration: '2s',
    ignoreEvents: true
  });

  item.addEventListener('touchstart', ripple.trigger, false);

  item.addEventListener('mousedown', ripple.trigger, false);

})();
