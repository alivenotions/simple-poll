const chai = require('chai')
const { Poll } = require('./poll')
const expect = chai.expect

const fakeFetch = num => new Promise((resolve, reject) => {
  console.log('yo! someone hit me up')
  setTimeout(_ => resolve(num), 1000)
})

describe('error conditions', () => {
  it('should throw an error when the executor is not passed', () => {
    const fn =
    () => Poll()
      .delay(1000)
      .args([3])
      .subscribe(console.log)
    expect(fn).to.throw(TypeError, 'cannot be undefined')
  })

  it('should throw an error when delay is not a number', () => {
    const fn =
      () => Poll()
        .executor(fakeFetch)
        .delay('100')
        .args([3])
        .subscribe(console.log)
    expect(fn).to.throw(TypeError, 'must be a number')
  })

  it('should throw an error when args are not in an array', () => {
    const fn =
      () => Poll()
        .executor(fakeFetch)
        .delay(5000)
        .args(3)
        .subscribe(console.log)
    expect(fn).to.throw(TypeError, 'must be an array')
  })

})
