import axios from 'axios'

const Http = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})

export default Http
