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

    onError: function (cb) {
      if (typeof cb !== 'function') throw new TypeError('onError takes in a function')
      this.onErrorCallback = cb 
      return this
    },

    /** subscriptions */
    unsubscribe: function (cb) {
      this.cancel = true
      if (typeof cb !== 'function') throw new TypeError('Unsubscribe takes in a function')
      cb()
    },

    subscribe: function (cb) {
      if (this.delay_ === undefined) {
        this.delay_ = 0
        console.log('WARN: taking default delay (0 ms) as no delay was passed') 
      }
      if (this.args_ === undefined) {
        this.args_ = []
        console.log('WARN: taking default args ([]) as no args were passed')
        console.log('      ensure that the executor is not expecting an arg')
      }

      if (typeof this.delay_ !== 'number') throw new TypeError('delay must be a number, recieved: ' + typeof this.delay_)
      if (!Array.isArray(this.args_)) throw new TypeError('args must be an array')
      if (this.executor_ === undefined) throw new TypeError('executor cannot be undefined. Please pass in a function')
    
      this.poll(cb)
      return this
    },

    poll: async function (cb) {
      for await (const resource of this) {
        cb(resource)
      }
    },

    /** pull iteration */
    [Symbol.asyncIterator]: async function* () {
      while (true) {
        await sleep(this.delay_)
        if (this.cancel) return
        try {
          yield await this.executor_(...this.args_)
        } catch (error) {
          if (this.onErrorCallback === undefined) {
            console.error('Terminating polling with error:', error)
            return
          } else {
            this.onErrorCallback(error)
          }
        }
      }
    }
  }
}

export { getPollObject as Poll }
