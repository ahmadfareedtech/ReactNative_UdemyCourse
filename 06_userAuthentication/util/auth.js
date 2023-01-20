import axios from "axios";

const API_KEY = 'AIzaSyCSURwP5Nq883f4ilFWDtMYOPHlwWxFvMQ'

async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`

    const response = await axios.post(
        url,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    )

    console.log(response.data)
}

export async function createUser(email, password) {
    const response = await authenticate('signUp', email, password)
}

export async function login(email, password) {
    const response = await authenticate('signInWithPassword', email, password)
}