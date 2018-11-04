# simple-poll

A polling utility that allows you to poll an http endpoint with configurable delay.

## Create a polling object

The httpPoll function expects an object with three keys:
- delay: number
- httpApi: a promise returning function
- httpArgs: array of arguments to the httpApi function

```javascript
const { httpPoll } = require('@alivenotions/simple-poll')
const fetch = require('node-fetch')

const poll = httpPoll({
  delay: 0,
  httpApi: fetch,
  httpArgs: ['https://jsonplaceholder.typicode.com/todos/1']
})
```
## Subscription
Subscription takes a callback function that is expecting the response as the argument.
```javascript
const cb = response => response.json().then(console.log)

poll.subscribe(cb)

// to unsubscirbe
poll.unsubscribe()
```

## Modifying configuration
You can change the values of the polling object by using the following setters:

```javascript
const addNumbers = (x, y) => new Promise(resolve => resolve(x + y))

poll.setDelay(5000)
poll.setHttpApi(addNumbers)
poll.setHttpArgs([1, 2])
```
