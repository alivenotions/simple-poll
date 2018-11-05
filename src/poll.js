const chalk = require('chalk')

const error = chalk.bold.red
const warning = chalk.keyword('orange')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getPollObject = ({
  delay,
  executor,
  args,
} = {}) => {

  if (delay === undefined) { delay = 0; console.log(warning('WARN: taking default delay (0 ms) as no delay was passed')) }
  if (args === undefined) { args = []; console.log(warning('WARN: taking default args ([]) as no args were passed')) }

  if (typeof delay !== 'number') throw new Error(error('delay must be a number, recieved: ' + typeof delay))
  if (!Array.isArray(args)) throw new Error(error('args must be an array'))
  if (executor === undefined) throw new Error(error('executor cannot be undefined. Please pass in a function'))

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
