const got = require('got')
// get a post
const BASE_URL = 'https://jsonplaceholder.typicode.com/'
const REQ_BASE_URL = 'https://reqres.in/api/'

const impl = {
  options: (url, options) => ({
    prefixUrl: url ? url : BASE_URL,
    ...options
  }),
  timeout: (url, timeout) => {
    return impl.options(url, {
      timeout: timeout
    })
  },
  sleep:  (ms) => {
    console.log(`sleep... ${ms}ms`)
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }
}
const handler = {
  httpError: (method, verb, err) => {
    if (err.response) {
      console.log('*********** ERROR *************');
      
      console.log(`${verb} ${method} ${err.response.statusCode} `)
      console.log(`BODY:-\n ${err.response.body}`)
      
      console.log('*******************************');
    }
    if (err.code === 404) {
      // do something
    } else if (err.code >= 500) {
      // probably want to look into this
      console.log('******** SERVER ERROR **********');
      console.log(err)
      console.log('********************************');
    }
  },
  timeoutError: (method, verb, err) => {
      console.log('******* TIMEOUT ERROR ***********');
      
      console.log(`${verb} ${method}`)
      console.log(`START:${err.timings.start} \nEND:${(new Date()).getTime()} \nEVENT:${err.event}`)
      
      console.log('********************************');
    },
    gotError: (method, verb, err) => {
      console.log('********** GOT ERROR ***********');
      
      console.log(`${verb} ${method} ${err.code}`)
      console.log(err)
      
      console.log('********************************');

  },
  error: (method, verb, err) => {
    if (err instanceof got.HTTPError) {
      handler.httpError(method, verb, err)
    } else if (err instanceof got.TimeoutError) {
      handler.timeoutError(method, verb, err)
    } else if (err instanceof got.GotError) {
      handler.gotError(method, verb, err)
    } else {
      // unknown error
      console.log('**********UNHANDLED*************')
      console.log(`${verb} ${method}`)
      console.log(err)
      console.log('********************************')
    }
    
  }
}

// 
// console.log('async getPosts START')
// got('posts', impl.options())
//   .json()
//   .then((response) => {
//     console.log(`GET /posts - obtained ${response.length} posts`)
//   })
//   .catch((error) => {
//     handler.error('posts', 'GET', error)
//   })
//   .finally(() => {
//     console.log('async getPosts END')
// })

// console.log('async getPostz START')
// got('postz', impl.options())
//   .json()
//   .then((response) => {
//     console.log(`GET /posts - obtained ${response.length} posts`)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
//   .finally((err) => {
//     console.log('async getPostz START')
//   })

// const awaitWithError = async () => {
//   console.log('awaitWithError START')
  
//   try {
//     await got('postz', impl.options())
//   } catch(err) {
//     handler.error('postz', 'GET', err)
//   }
//   console.log('awaitWithError END')
// }
// awaitWithError()

// const getMultiplePostsPromise = async () => {
//   console.log('getMultiplePostsPromise')
  
//   console.log('GET multiple posts with Promise START')
//   const results = await Promise.all([
//     got('posts/1', impl.options()).json(),
//     got('posts/2', impl.options()).json(),
//   ])
//   console.log('Results from getMultiplePostsPromise:-\n', results)
//   console.log('GET multiple posts with Promise END')
// }
// getMultiplePostsPromise()

// // const simulateServerError = async () => {
// //   console.log('simulateServerError - This might take a while...')
// //   got.put('postz', impl.options())
// //   .catch((err) => {
// //     console.log(err)
// //     handler.error('postz', 'PUT',  err)
// //   })
// // }
// // simulateServerError()

// const simulateNotFoundError = async () => {
//   console.log('simulateNotFoundError START')
//   got.get('posts/abc', impl.options())
//     .then((result) => {
//       console.log(result)
//     })
//     .catch((err) => {
//       handler.error('posts/abc', 'GET', err)
//     })
//     .finally(() => {
//       console.log('simulateNotFoundError END')
//     })
// }
// simulateNotFoundError()

// const simulateTimeoutError = async () => {
//   console.log('simulateTimeoutError START')
//   got.get('users?delay=3', impl.timeout(REQ_BASE_URL, 1000))
//     .json()
//     .then((result) => {
//       console.log('result', result)
//     })
//     .catch((err) => {
//       handler.error('api/users?delay=3', 'GET', err)
//     })
// }
// simulateTimeoutError()

const simulateDomainNotFound = async () => {
  console.log('simulateDomainNotFound START')
  got.get('http://asd123213zxcx.com/')
    // .on('error', (err) => {
    //   console.log('GOT ERROR', err)
    // })
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      handler.error('http://asd123213zxcx.com/', 'GET', err)
    })
}

simulateDomainNotFound()