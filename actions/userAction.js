import {FETCH_USER_INFO, FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_ERROR, SAVE_USER_INFO ,SAVE_USER_INFO_SUCCESS, SAVE_USER_INFO_ERROR} from "../constants";

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
