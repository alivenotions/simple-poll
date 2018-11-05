const fakeFetch = require('../test/mockApi')
const { Poll } = require('../src/poll')
const fetch = require('node-fetch')

const json = res => res.json().then(console.log)

const poll = Poll({ executor: fakeFetch, args: [2] })
.subscribe(console.log)

// setTimeout(_ => {
//   let sum = 0
//   for(let i = 0; i < 100000; i++) {
//     sum += i * 1843
//     console.log(sum)
//   }
// }, 9500)
setTimeout(_ => {poll.setDelay(5000); poll.setArgs([5])}, 10000)
setTimeout(_ => {poll.unsubscribe()}, 14000)
