# simple-poll

A polling utility that allows you to poll an http endpoint with configurable delay.

```javascript
const poll = httpPoll({
  delay: 0,
  httpApi: fakeFetch,
  httpArgs: [3]
})
```
