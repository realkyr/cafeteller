// set up base api for axios
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

console.log({ baseURL: process.env.NEXT_PUBLIC_API_URL })

export default instance
