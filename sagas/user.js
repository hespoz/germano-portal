import {put, call, takeEvery, all} from 'redux-saga/effects';
import {
    FETCH_USER_INFO,
    SAVE_USER_INFO,
    ALLOW_PROFILE_INFO_OPERATION,
    SAVE_USER_INFO_CONFIRM
} from "../constants";
import {fetchUserInfoSuccess, fetchUserInfoError, saveUserInfoSuccess, saveUserInfoError, confirmLoginSuccess, confirmLoginError, saveUserInfoConfirmSuccess, saveUserInfoConfirmError} from '../actions/userAction'
import {updateLocalEmail, updateLocalUsername} from '../actions/authAction'

import apiHelper from "../apiHelper";

function *sleep(time) {
    yield new Promise(resolve => setTimeout(resolve, time));
}

function* fetchUserInfo() {
    try {
        const res = yield call(apiHelper.fetchUserInfo)

        yield put(fetchUserInfoSuccess(res.data))

    } catch (error) {
        yield put(fetchUserInfoError({message:error.response.data.message}))
    }
}

function* saveUserInfo(action) {
    try {

        const res = yield call(apiHelper.saveUserInfo, action.payload)

        yield put(saveUserInfoSuccess(res.data.message))
        yield put(updateLocalUsername(res.data.username))

        Cookies.set("userName", res.data.username)


        yield sleep(15000)

        yield put(saveUserInfoSuccess(null))


    } catch (error) {
        yield put(saveUserInfoError({message:error.response.data.message}))
    }
}

function* saveUserInfoConfirm(action) {
    try {
        const res = yield call(apiHelper.saveUserInfoConfirm, action.payload)
        yield put(saveUserInfoConfirmSuccess(true))
        yield put(updateLocalEmail(res.data.email))
    } catch (error) {
        yield put(saveUserInfoConfirmError({message:error.response.data.message}))
    }
}


function* confirmLogin(action) {
    try {
        yield call(apiHelper.login, action.payload)
        yield put(confirmLoginSuccess(true))
        yield sleep(15000)
        yield put(confirmLoginSuccess(false))
    } catch (error) {
        yield put(confirmLoginError({message:error.response.data.message}))
    }
}


export default function* userSaga() {
    yield all([
        takeEvery(FETCH_USER_INFO, fetchUserInfo),
        takeEvery(SAVE_USER_INFO, saveUserInfo),
        takeEvery(ALLOW_PROFILE_INFO_OPERATION, confirmLogin),
        takeEvery(SAVE_USER_INFO_CONFIRM, saveUserInfoConfirm)
    ])
}
