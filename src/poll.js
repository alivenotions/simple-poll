const chalk = require('chalk')

const error = chalk.bold.red
const warning = chalk.keyword('orange')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getPollObject = ({
  delay,
  executor,
  args,
} = {}) => {

  return {
    /** initial values */
    cancel: false,
    delay_: delay,
    executor_: executor,
    args_: args,

    /** setters */
    delay(delay) { this.delay_ = delay; return this },
    executor(executor) { this.executor_ = executor; return this },
    args(args) { this.args_ = args; return this },

    /** subscriptions */
    unsubscribe: function () { this.cancel = true },
    subscribe: function (cb) {
      if (this.delay_ === undefined) {
        this.delay_ = 0
        console.log(warning('WARN: taking default delay (0 ms) as no delay was passed')) 
      }
      if (this.args_ === undefined) {
        this.args_ = []
        console.log(warning('WARN: taking default args ([]) as no args were passed'))
        console.log(warning('      ensure that the executor is not expecting an arg'))
      }

      if (typeof this.delay_ !== 'number') throw new Error(error('delay must be a number, recieved: ' + typeof this.delay_))
      if (!Array.isArray(this.args_)) throw new Error(error('args must be an array'))
      if (this.executor_ === undefined) throw new Error(error('executor cannot be undefined. Please pass in a function'))
    
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
        await sleep(this.delay_)
        if (this.cancel) return
        yield await this.executor_(...this.args_)
      }
    }
  }
}

module.exports = { Poll: getPollObject }
