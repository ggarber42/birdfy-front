import axios from 'axios'
import store from '../store'

const URL = 'http://localhost:8080/api/v1/birdfy'

export function teste() {
  axios({
    method: 'post',
    url: `${URL}/ave`,
    data: {
      nome: 'Tom',
    },
  })
}

export function routeRequiresAuth(to) {
  return to.matched.some((record) => record.meta.requiresAuth)
}

export function waitFetching(maxTries = 10, timeInterval = 200) {
  return new Promise((resolve) => {
    let tries = 0
    const interval = setInterval(() => {
      tries += 1
      const value = store.getters.fetchingData
      if (!value) {
        clearInterval(interval)
        resolve()
      }

      if (tries >= maxTries) {
        clearInterval(interval)
        resolve()
      }
    }, timeInterval)
  })
}
