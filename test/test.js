const fakeFetch = require('../test/mockApi')
const { httpPoll } = require('../src/poll')

httpPoll.delay = 0
httpPoll.httpApi = fakeFetch
httpPoll.httpArg = 3
console.log(httpPoll.httpArg)
httpPoll.subscribe(console.log)

setTimeout(_ => {httpPoll.delay = 5000}, 10000)
setTimeout(_ => {httpPoll.unsubscribe()}, 15000)
