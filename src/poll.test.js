import { useFakeTimers, fake } from 'sinon';
import { Poll } from './index';

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
    expect(fn).toThrowError(TypeError)
  })

  it('should throw an error when delay is not a number', () => {
    const fn =
      () => Poll()
        .executor(fakeFetch)
        .delay('100')
        .args([3])
        .subscribe(console.log)
    expect(fn).toThrowError(TypeError)
  })

  it('should throw an error when args are not in an array', () => {
    const fn =
      () => Poll()
        .executor(fakeFetch)
        .delay(5000)
        .args(3)
        .subscribe(console.log)
    expect(fn).toThrowError(TypeError)
  })

})

describe('polling tests', () => {
  let clock

  beforeEach(() => {
    clock = useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should poll with 0 ms(default) when no delay is passed', (done) => {
    const val = 1
    const executor = fake.resolves(2)
    const poll = Poll()
      .executor(executor)
      .args([val])
      .subscribe(returnedData => {
        expect(returnedData).toBe(2)
        done()
      })

    clock.tick(1)
  })

  it('should poll with no args(default) when no args is passed', (done) => {
    const executor = val => new Promise(resolve => resolve(val))
    const poll = Poll()
      .executor(executor)
      .delay(1000)
      .subscribe(returnedData => {
        expect(returnedData).toBeUndefined()
        done()
      })

    clock.tick(1001)
  })

  it('should unsubscribe gracefully', (done) => {
    let pollFrequency = 0
    const executor = val => new Promise(resolve => resolve(val))
    const poll = Poll()
      .executor(executor)
      .delay(1000)
      .args([10])
      .subscribe(returnedData => {
        pollFrequency += 1
        console.log(pollFrequency)
        expect(pollFrequency).toBe(0)
        done()
      })


    clock.setTimeout(() => {
      poll.unsubscribe(console.log)
      expect(pollFrequency).toBe(0)
      done()
    }, 500)
    clock.tick(1000)
  })
})
