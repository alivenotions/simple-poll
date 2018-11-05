const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getPollObject = ({
  delay = 0,
  executor,
  args = [],
} = {}) => {

  if (typeof delay !== 'number') throw new Error('delay must be a number, recieved: ' + typeof delay)
  if (!Array.isArray(args)) throw new Error('args must be an array')
  if (executor === undefined) throw new Error('executor cannot be undefined. Please pass in a function')
  
  return {
    /** initial values */
    cancel: false,
    delay,
    executor,
    args,

    /** setters */
    setDelay(delay) { this.delay = delay },
    setExecutor(executor) { this.executor = executor },
    setArgs(args) { this.args = args },

    /** subscriptions */
    unsubscribe: function () { this.cancel = true },
    subscribe: function (cb) {
      this.poll(cb)
      return this
    },

    poll: async function (cb) {
      for await (const resource of this) {
        cb(resource)
      }
      return this
    },

    /** pull iteration */
    [Symbol.asyncIterator]: async function* () {
      while (true) {
        if (this.cancel) return
        await sleep(this.delay)
        yield await this.executor(...this.args)
      }
    }
  }
}

module.exports = { Poll: getPollObject }
