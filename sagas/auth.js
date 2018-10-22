import { put, call, takeEvery, all } from 'redux-saga/effects';
import {REGISTER, LOGIN, LOGOUT, CONFIRM_USER, VERIFICATION_STATUS, RESEND_VERIFICATION_EMAIL} from "../constants";

import apiHelper from "../apiHelper";
import {registerError, registerSuccess, loginSuccess, loginError, logOutSuccess, confirmUserSuccess, confirmUserError, verificationStatusSuccess, verificationStatusError,
    resendVerificationEmailSuccess, resendVerificationEmailError} from "../actions/authAction";

import Cookies from 'js-cookie'
import {fetchBucketsSuccess} from "../actions/bucketAction";

function* register(action) {
    try {
        const res = yield call(apiHelper.register, action.payload)
        Cookies.set("token", res.data.token)
        Cookies.set("userId", res.data.userId)
        Cookies.set("userName", res.data.userName)
        Cookies.set("verified", res.data.verified)
        yield put(registerSuccess(res.data))
        const resBuckets = yield call(apiHelper.fetchBuckets, res.data.userName)
        yield put(fetchBucketsSuccess(resBuckets.data))
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
        Cookies.set("verified", res.data.verified)
        yield put(loginSuccess(res.data))
        const resBuckets = yield call(apiHelper.fetchBuckets, res.data.userName)
        yield put(fetchBucketsSuccess(resBuckets.data))
    } catch (error) {
        console.log(error.response)
        yield put(loginError({message:error.response.data.message}))
    }
}

function* logOut() {
    Cookies.remove("token")
    Cookies.remove("userId")
    Cookies.remove("userName")
    localStorage.clear()
    yield put(logOutSuccess())
}

function* confirmUser(action) {
    try {
        const res = yield call(apiHelper.confirmUser, action.payload)
        yield put(confirmUserSuccess(res.data))
    } catch (error) {
        yield put(confirmUserError({message:error.response.data.message}))
    }
}

function* verificationStatus() {
    try {
        const res = yield call(apiHelper.verificationStatus)
        yield put(verificationStatusSuccess(res.data))
    } catch (error) {
        yield put(verificationStatusError({message:error.response.data.message}))
    }
}

function *sleep(time) {
    yield new Promise(resolve => setTimeout(resolve, time));
}

function* resendVerificationEmail() {
    try {
        yield call(apiHelper.resendVerificationEmail)
        yield put(resendVerificationEmailSuccess(true))

        yield sleep(15000)

        yield put(resendVerificationEmailSuccess(false))

    } catch (error) {
        yield put(resendVerificationEmailError({message:error.response.data.message}))
    }
}

export default function* authSaga() {
    yield all([
        takeEvery(REGISTER, register),
        takeEvery(LOGIN, login),
        takeEvery(LOGOUT, logOut),
        takeEvery(CONFIRM_USER, confirmUser),
        takeEvery(VERIFICATION_STATUS, verificationStatus),
        takeEvery(RESEND_VERIFICATION_EMAIL, resendVerificationEmail),
    ])
}
