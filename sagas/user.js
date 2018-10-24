import {put, call, takeEvery, all} from 'redux-saga/effects';
import {
    FETCH_USER_INFO,
    SAVE_USER_INFO
} from "../constants";
import {fetchUserInfoSuccess, fetchUserInfoError, saveUserInfoSuccess, saveUserInfoError} from '../actions/userAction'

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

        yield call(apiHelper.saveUserInfo, action.payload)

        yield put(saveUserInfoSuccess(true))

        yield sleep(15000)

        yield put(saveUserInfoSuccess(false))

    } catch (error) {
        yield put(saveUserInfoError({message:error.response.data.message}))
    }
}

export default function* userSaga() {
    yield all([
        takeEvery(FETCH_USER_INFO, fetchUserInfo),
        takeEvery(SAVE_USER_INFO, saveUserInfo)
    ])
}