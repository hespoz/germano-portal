import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    LOGOUT_SUCCESS,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    REGISTER_CLEAR,
    OPEN_AUTH_MODAL,
    CLOSE_AUTH_MODAL, TOGGLE_AUTH_FORMS,
    GET_TOKEN
} from '../constants'

export const login = (data) => ({
    type: LOGIN,
    payload: data
})

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
})

export const loginError = (data) => ({
    type: LOGIN_ERROR,
    payload: data
})

export const logOut = () => ({
    type: LOGOUT
})

export const logOutSuccess = () => ({
    type: LOGOUT_SUCCESS
})

export const register = (data) => ({
    type: REGISTER,
    payload: data
})

export const registerSuccess = (data) => ({
    type: REGISTER_SUCCESS,
    payload: data
})

export const registerError = (data) => ({
    type: REGISTER_ERROR,
    payload: data
})

export const registerClear = () => ({
    type: REGISTER_CLEAR
})

export const openAuthModal = () => ({
    type: OPEN_AUTH_MODAL
})

export const closeAuthModal = () => ({
    type: CLOSE_AUTH_MODAL
})


export const toggleAuthForms = () => ({
    type: TOGGLE_AUTH_FORMS
})

export const getToken = () => ({
    type: GET_TOKEN
})