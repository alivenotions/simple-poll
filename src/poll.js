const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const httpPoll = {
  cancel: false,
  delay: 0,
  httpApi: null,
  httpArg: 0,
  unsubscribe: function() {this.cancel = true},
  subscribe : async function (cb) {
    for await (const resource of httpPoll) {
      cb(resource)
    }
  },
  [Symbol.asyncIterator]: async function*() {
    while (true) {
      if(httpPoll.cancel) return
      await sleep(httpPoll.delay)
      yield await httpPoll.httpApi(httpPoll.httpArg)
    }
  }
}


module.exports = { httpPoll }

/*
1. Polling
2. Delay
*/
