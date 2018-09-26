import { put, call, takeEvery, all } from 'redux-saga/effects';
import { REGISTER, LOGIN, LOGOUT } from "../constants";

import apiHelper from "../apiHelper";
import {registerError, registerSuccess, loginSuccess, loginError, logOutSuccess} from "../actions/authAction";

import Cookies from 'js-cookie'

function* register(action) {
    try {
        const res = yield call(apiHelper.register, action.payload)
        Cookies.set("token", res.data.token)
        yield put(registerSuccess(res.data))
    } catch (error) {
        console.log("error", error.response)
        yield put(registerError({message:error.response.data.message}))
    }
}

function* login(action) {
    try {
        const res = yield call(apiHelper.login, action.payload)
        Cookies.set("token", res.data.token)
        Cookies.set("userId", res.data.userId)
        Cookies.set("userName", res.data.userName)
        yield put(loginSuccess(res.data))
    } catch (error) {
        console.log(error.response)
        yield put(loginError({message:error.response.data.message}))
    }
}

function* logOut() {
    Cookies.remove("token")
    yield put(logOutSuccess())
}

export default function* authSaga() {
    yield all([
        takeEvery(REGISTER, register),
        takeEvery(LOGIN, login),
        takeEvery(LOGOUT, logOut)
    ])
}
