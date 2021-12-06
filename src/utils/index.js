import axios from 'axios'

const url = 'http://localhost:8080/api/v1/birdfy'

export default function teste() {
  axios({
    method: 'post',
    url: `${url}/ave`,
    data: {
      nome: 'Tom',
    },
  })
}
