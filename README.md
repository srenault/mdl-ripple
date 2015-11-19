# mdl-ripple

Adapt [material design lite](https://github.com/google/material-design-lite/blob/master/src/ripple/ripple.js) code to be able to add ripple effect on any dom element.

## Install

```sh
npm install --save-dev mdl-ripple
```

## API

~~~ javascript
import Ripple from './ripple.js';

const item = document.querySelector('li');

const rippleItem = Ripple(item, {
  background: 'red',
  duration: '2s'
});

// Unbind events
rippleItem.downgrade();
~~~

