const fakeFetch = require('../example/mockApi')
const { Poll } = require('../dist/index')
const mockApi = (num) => {
  return new Promise((resolve, reject) => {
    if (Math.random() * 10 > 7) {
      throw ('Whoops!')
    }
    resolve(num)
  })
}

const p1 = Poll({
  delay: 1000,
  executor: mockApi,
  args: [10]
})
.onError(err => console.log(err, 2))

p1.subscribe(console.log)
setTimeout(() => p1.unsubscribe(() => console.log('Finished🎊')), 5000)

