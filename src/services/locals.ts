import axios from 'axios';
import { parseCookies } from 'nookies'

const { 'authToken': token } = parseCookies()
const URL = `http://${process.env.REACT_APP_API_LOCAL}:${process.env.REACT_APP_API_PORT}`

export const api = axios.create({
    baseURL: URL,
})

if(token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
}
