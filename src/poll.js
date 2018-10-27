const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getHttpPollObject = ({
  delay,
  httpApi,
  httpArgs,
}) => ({
  cancel: false,
  delay,
  httpApi,
  httpArgs,
  unsubscribe: function() {this.cancel = true},
  subscribe : async function (cb) {
    for await (const resource of this) {
      cb(resource)
    }
  },
  [Symbol.asyncIterator]: async function*() {
    while (true) {
      if(this.cancel) return
      await sleep(this.delay)
      yield await this.httpApi(...this.httpArgs)
    }
  }
})

module.exports = { httpPoll: getHttpPollObject }

/*
1. Polling
2. Delay
*/
