import {
    FETCH_USER_INFO,
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_ERROR,
    SAVE_USER_INFO,
    SAVE_USER_INFO_SUCCESS,
    SAVE_USER_INFO_ERROR,
    TOGGLE_CONFIRMATION_MODAL,
    ALLOW_PROFILE_INFO_OPERATION,
    ALLOW_PROFILE_INFO_OPERATION_SUCCESS,
    ALLOW_PROFILE_INFO_OPERATION_ERROR,
    SAVE_USER_INFO_CONFIRM,
    SAVE_USER_INFO_CONFIRM_SUCCESS,
    SAVE_USER_INFO_CONFIRM_ERROR
} from "../constants";

export const fetchUserInfo = () => ({
    type: FETCH_USER_INFO
})

export const fetchUserInfoSuccess = (data) => ({
    type: FETCH_USER_INFO_SUCCESS,
    payload: data
})

export const fetchUserInfoError = (data) => ({
    type: FETCH_USER_INFO_ERROR,
    payload: data
})

export const saveUserInfo = (data) => ({
    type: SAVE_USER_INFO,
    payload: data
})

export const saveUserInfoSuccess = (data) => ({
    type: SAVE_USER_INFO_SUCCESS,
    payload: data
})

export const saveUserInfoError = (data) => ({
    type: SAVE_USER_INFO_ERROR,
    payload: data
})

export const toggleConfirmationModal = (data) => ({
    type: TOGGLE_CONFIRMATION_MODAL,
    payload: data
})


export const confirmLogin = (data) => ({
    type: ALLOW_PROFILE_INFO_OPERATION,
    payload: data
})

export const confirmLoginSuccess = (data) => ({
    type: ALLOW_PROFILE_INFO_OPERATION_SUCCESS,
    payload: data
})

export const confirmLoginError = (data) => ({
    type: ALLOW_PROFILE_INFO_OPERATION_ERROR,
    payload: data
})

export const saveUserInfoConfirm = (data) => ({
    type: SAVE_USER_INFO_CONFIRM,
    payload: data
})

export const saveUserInfoConfirmSuccess = (data) => ({
    type: SAVE_USER_INFO_CONFIRM_SUCCESS,
    payload: data
})

export const saveUserInfoConfirmError = (data) => ({
    type: SAVE_USER_INFO_CONFIRM_ERROR,
    payload: data
})



