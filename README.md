# simple-poll

[![Travis (.org)](https://img.shields.io/travis/alivenotions/simple-poll.svg?style=flat-square)](https://travis-ci.org/alivenotions/simple-poll)
[![GitHub](https://img.shields.io/github/license/alivenotions/simple-poll.svg?style=flat-square)](./LICENSE)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@alivenotions/simple-poll.svg?style=flat-square)
![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@alivenotions/simple-poll.svg?style=flat-square)
![npm (scoped)](https://img.shields.io/npm/v/@alivenotions/simple-poll.svg?style=flat-square)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

A pull-based polling utility that allows you to poll any function that returns a promise with configurable delay.

## Getting started

Install using npm:

```
npm install @alivenotions/simple-poll
```

With a script tag:

```html
<script src="https://unpkg.com/@alivenotions/simple-poll@0.2.3/dist/poll.umd.min.js"></script>
```

## Support

* Works for Node >= 6
* Works on all modern browsers. (TODO: the exact versions and for IE)

## Create a polling object

The Poll function expects an object with three keys:
- delay: number, if not passed, a default of 0 is taken
- executor: a promise returning function, throws an error if not passed
- args: array of arguments to the executor function, if not passed, a default of an empty array is taken

```javascript
const { Poll } = require('@alivenotions/simple-poll')
const fetch = require('node-fetch')

const poll = Poll({
  delay: 0,
  executor: fetch,
  args: ['https://jsonplaceholder.typicode.com/todos/1']
})
```

Alternatively, you can chain the values by calling the [setters](#modifying-configuration).
```javascript
const { Poll } = require('@alivenotions/simple-poll')
const fetch = require('node-fetch')

const poll = Poll()
  .executor(fetch)
  .args(['https://jsonplaceholder.typicode.com/todos/1'])
  .delay(1000)
```

## Subscription
The poll object is lazy and won't start polling until it is subscribed to. Subscription takes a callback function that is expecting the response as the argument.
```javascript
const { Poll } = require('@alivenotions/simple-poll')
const fetch = require('node-fetch')

const poll = Poll({
  delay: 0,
  executor: fetch,
  args: ['https://jsonplaceholder.typicode.com/todos/1']
})
const cb = response => response.json().then(console.log)

poll.subscribe(cb)

// alternatively, you can compose this
Poll()
  .executor(fetch)
  .args('https://jsonplaceholder.typicode.com/todos/1')
  .delay(1000)
  .subscribe(console.log)

// to unsubscirbe
poll.unsubscribe()
```

## Modifying configuration
You can change the values of the polling object by using the following setters:

```javascript
const addNumbers = (x, y) => new Promise(resolve => resolve(x + y))

poll.delay(5000)
poll.executor(addNumbers)
poll.args([1, 2])
```
