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
    SET_AUTH_FORM,
    GET_TOKEN,
    CONFIRM_USER,
    CONFIRM_USER_SUCCESS,
    CONFIRM_USER_ERROR,
    VERIFICATION_STATUS,
    VERIFICATION_STATUS_SUCCESS,
    VERIFICATION_STATUS_ERROR,
    RESEND_VERIFICATION_EMAIL,
    RESEND_VERIFICATION_EMAIL_SUCCESS,
    RESEND_VERIFICATION_EMAIL_ERROR,
    RECOVER_PASSWORD,
    RECOVER_PASSWORD_SUCCESS,
    RECOVER_PASSWORD_ERROR,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    UPDATE_LOCAL_EMAIL,
    UPDATE_LOCAL_USERNAME
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


export const setAuthForms = (data) => ({
    type: SET_AUTH_FORM,
    payload: data
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

export const resendVerificationEmail = () => ({
    type: RESEND_VERIFICATION_EMAIL
})

export const resendVerificationEmailSuccess = (data) => ({
    type: RESEND_VERIFICATION_EMAIL_SUCCESS,
    payload: data
})

export const resendVerificationEmailError = (data) => ({
    type: RESEND_VERIFICATION_EMAIL_ERROR,
    payload: data
})


export const recoverPassword = (data) => ({
    type: RECOVER_PASSWORD,
    payload: data
})

export const recoverPasswordSuccess = (data) => ({
    type: RECOVER_PASSWORD_SUCCESS,
    payload: data
})

export const recoverPasswordError = (data) => ({
    type: RECOVER_PASSWORD_ERROR,
    payload: data
})

export const resetPassword = (data) => ({
    type: RESET_PASSWORD,
    payload: data
})

export const resetPasswordSuccess = (data) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: data
})

export const resetPasswordError = (data) => ({
    type: RESET_PASSWORD_ERROR,
    payload: data
})

export const updateLocalEmail = (data) => ({
    type: UPDATE_LOCAL_EMAIL,
    payload: data
})

export const updateLocalUsername = (data) => ({
    type: UPDATE_LOCAL_USERNAME,
    payload: data
})
