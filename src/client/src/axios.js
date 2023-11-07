import axios from 'axios'

export const apiImage = "http://localhost:8800/images/"

export const makeRequest = axios.create({
    baseURL: "http://localhost:8800/api",
    withCredentials: true
})