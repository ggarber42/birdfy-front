import axios from 'axios'

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
