const fakeFetch = require('../test/mockApi')
const { httpPoll } = require('../src/poll')
const fetch = require('node-fetch')

const json = res => res.json().then(console.log)

const poll = httpPoll({
  delay: 5000,
  httpApi: fetch,
  httpArgs: 'https://jsonplaceholder.typicode.com/todos/1'
})

poll.subscribe(json)

// setTimeout(_ => {
//   let sum = 0
//   for(let i = 0; i < 100000; i++) {
//     sum += i * 1843
//     console.log(sum)
//   }
// }, 9500)
// setTimeout(_ => {poll.setDelay(5000); poll.setHttpArgs([5])}, 10000)
// setTimeout(_ => {poll.unsubscribe()}, 15000)
