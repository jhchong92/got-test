const got = require('got')
// get a post
const BASE_URL = 'https://jsonplaceholder.typicode.com/'

const impl = {
  options: () => ({
    prefixUrl: BASE_URL
  })
}
const httpHandler = {
  error: (method, verb, err) => {
    if (!err instanceof got.HTTPError) {
      console.log('Not a HTTP error!')
      return
    }
    console.log('*********** ERROR *************');
    
    console.log(`${verb} ${method} ${err.response.statusCode} `)
    console.log(`BODY:-\n ${err.response.body}`)
    
    console.log('*******************************');
    if (err.code === 404) {
      // do something
    }
  }
}
// got('posts', {
//   prefixUrl: BASE_URL
// }).json().then((response) => {
//   console.log(`GET /posts - obtained ${response.length} posts`)
// }).catch((error) => {
//   console.log(`GET /posts error ${error}`);
// })

// got('postz', impl.options())
//   .json()
//   .then((response) => {
//     console.log(`GET /posts - obtained ${response.length} posts`)
//   }).catch((err) => {
//     console.log(err)
//   })

// (async() => {
  
//   const res = await got('postz', impl.options())
//     .on('error', (error) => {
//       console.log(error)
//     })
// })();
const promise = async () => {
  console.log('calling with await')
  const res = await got('postz', impl.options())
    .catch(err => {
      httpHandler.error('postz', 'GET', err)
    })
  console.log('done calling with await')
}
promise();