# simple-poll

A pull-based polling utility that allows you to poll any function that returns a promise with configurable delay.

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
