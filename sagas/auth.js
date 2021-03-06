import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
    REGISTER, LOGIN, LOGOUT, CONFIRM_USER, VERIFICATION_STATUS, RESEND_VERIFICATION_EMAIL, RECOVER_PASSWORD,
    RESET_PASSWORD, CHANGE_PASSWORD
} from "../constants";

import apiHelper from "../apiHelper";
import {registerError, registerSuccess, loginSuccess, loginError, logOutSuccess, confirmUserSuccess, confirmUserError, verificationStatusSuccess, verificationStatusError,
    resendVerificationEmailSuccess, resendVerificationEmailError,recoverPasswordSuccess, recoverPasswordError, resetPasswordSuccess, resetPasswordError, changePasswordSuccess, changePasswordError} from "../actions/authAction";

import Cookies from 'js-cookie'
import {fetchBucketsSuccess} from "../actions/bucketAction";

function* register(action) {
    try {
        const res = yield call(apiHelper.register, action.payload)
        Cookies.set("token", res.data.token)
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
    yield put(logOutSuccess())
    window.location = "/"
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

function* recoverPassword(action) {
    try {
        yield call(apiHelper.recoveryPassword, action.payload)

        yield put(recoverPasswordSuccess(true))

        yield sleep(15000)

        yield put(recoverPasswordSuccess(false))

    } catch (error) {
        yield put(recoverPasswordError({message:error.response.data.message}))
    }
}

function* resetPassword(action) {
    try {
        yield call(apiHelper.resetPassword, action.payload)
        yield put(resetPasswordSuccess(true))
    } catch (error) {
        yield put(resetPasswordError({message:error.response.data.message}))
    }
}


function* changePassword(action) {
    try {
        yield call(apiHelper.changePassword, action.payload)
        yield put(resetPasswordSuccess(true))
    } catch (error) {
        yield put(resetPasswordError({message:error.response.data.message}))
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
        takeEvery(RECOVER_PASSWORD, recoverPassword),
        takeEvery(RESET_PASSWORD, resetPassword),
        takeEvery(CHANGE_PASSWORD, changePassword)
    ])
}
