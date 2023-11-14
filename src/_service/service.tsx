import Axios from "./environement.tsx"
import { Logins } from "../models/login"

let login = (credentials: Logins) => {
    return Axios.post('/auth/login')
}

let saveToken = (token: string) => {
    localStorage.setItem('token', token)
}

let logout = () => {
    localStorage.removeItem('token')
}


let isLogged = () => {
    let token = localStorage.getItem('token')

    return !!token
}

let getToken = () => {

    return localStorage.getItem('token')
}

export const accountService = {
    login, saveToken, logout, isLogged, getToken
}