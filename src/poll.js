const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getHttpPollObject = ({
  delay,
  httpApi,
  httpArgs,
}) => {

  if (typeof delay !== 'number') throw new Error('delay must be a number, recieved: ' + typeof delay)
  if (!Array.isArray(httpArgs)) throw new Error('httpArgs must be an array')

  return {
    /** initial values */
    cancel: false,
    delay,
    httpApi,
    httpArgs,

    /** setters */
    setDelay(delay) { this.delay = delay },
    setHttpApi(httpApi) { this.httpApi = httpApi },
    setHttpArgs(httpArgs) { this.httpArgs = httpArgs },

    /** subscriptions */
    unsubscribe: function () { this.cancel = true },
    subscribe: async function (cb) {
      for await (const resource of this) {
        cb(resource)
      }
    },

    /** pull iteration */
    [Symbol.asyncIterator]: async function* () {
      while (true) {
        if (this.cancel) return
        await sleep(this.delay)
        yield await this.httpApi(...this.httpArgs)
      }
    }
  }
}

module.exports = { httpPoll: getHttpPollObject }
