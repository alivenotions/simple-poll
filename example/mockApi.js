const fakeFetch = num => new Promise((resolve, reject) => {
  console.log('yo! someone hit me up')
  setTimeout(_ => resolve(num), 1000)
})

module.exports = fakeFetch
