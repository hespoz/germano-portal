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
    CLOSE_AUTH_MODAL,
    TOGGLE_AUTH_FORMS,
    GET_TOKEN,
    CONFIRM_USER,
    CONFIRM_USER_SUCCESS,
    CONFIRM_USER_ERROR,
    VERIFICATION_STATUS,
    VERIFICATION_STATUS_SUCCESS,
    VERIFICATION_STATUS_ERROR
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

export const openAuthModal = (data) => ({
    type: OPEN_AUTH_MODAL,
    payload: data
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

export const confirmUser = (data) => ({
    type: CONFIRM_USER,
    payload: data
})

export const confirmUserSuccess = (data) => ({
    type: CONFIRM_USER_SUCCESS,
    payload: data
})

export const confirmUserError = (data) => ({
    type: CONFIRM_USER_ERROR,
    payload: data
})

export const verificationStatus = () => ({
    type: VERIFICATION_STATUS
})

export const verificationStatusSuccess = (data) => ({
    type: VERIFICATION_STATUS_SUCCESS,
    payload: data
})

export const verificationStatusError = (data) => ({
    type: VERIFICATION_STATUS_ERROR,
    payload: data
})

