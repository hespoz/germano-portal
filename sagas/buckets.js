import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
    FETCH_BUCKETS,
    SAVE_BUCKET,
    DELETE_BUCKET,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    OPEN_SEND_TO_BUCKET_MODAL,
    FETCH_BUCKETS_DETAILS,
    FETCH_LAST_BUCKETS
} from "../constants";
import apiHelper from '../apiHelper'
import {fetchBucketsError,
    fetchBucketsLoading,
    fetchBucketsSuccess,
    saveBucketError,
    saveBucketSuccess,
    deleteBucketSuccess,
    deleteBucketError,
    addCommentSuccess,
    addCommentError,
    editCommentSuccess,
    editCommentError,
    deleteCommentSuccess,
    deleteCommentError,
    openSendToBucketModalSuccess,
    openSendToBucketModalError,
    fetchBucketDetailsSuccess,
    fetchBucketDetailsError,
    fetchLastBucketsSuccess,
    fetchLastBucketsError} from "../actions/bucketAction";
import Cookies from "js-cookie";


function* fetchBuckets(action) {
    try {
        yield put(fetchBucketsLoading())
        const res = yield call(apiHelper.fetchBuckets, action.payload)
        yield put(fetchBucketsSuccess(res.data))
    } catch (error) {
        yield put(fetchBucketsError(error))
    }
}

function* saveBucket(action) {
    try {
        const res = yield call(apiHelper.saveBucket, action.payload)
        yield put(saveBucketSuccess(res.data))
    } catch (error) {
        yield put(saveBucketError(error))
    }
}

function* deleteBucket(action) {
    try {
        const res = yield call(apiHelper.deleteBucket, action.payload)
        yield put(deleteBucketSuccess(res.data))
    } catch (error) {
        yield put(deleteBucketError(error))
    }
}

function* addComment(action) {
    try {
        const res = yield call(apiHelper.addComment, action.payload)
        yield put(addCommentSuccess(res.data))
    } catch (error) {
        yield put(addCommentError(error))
    }
}

function* editComment(action) {
    try {
        const res = yield call(apiHelper.editComment, action.payload)
        yield put(editCommentSuccess(res.data))
    } catch (error) {
        yield put(editCommentError(error))
    }
}

function* deleteComment(action) {
    try {
        const res = yield call(apiHelper.deleteComment, action.payload)
        yield put(deleteCommentSuccess(res.data))
    } catch (error) {
        yield put(deleteCommentError(error))
    }
}

function* openSendBucketModal(action) {
    try {
        const res = yield call(apiHelper.fetchBuckets, Cookies.get("userName"))
        yield put(openSendToBucketModalSuccess({buckets:res.data.buckets, username: res.data.username, wordId: action.payload}))
    } catch (error) {
        yield put(openSendToBucketModalError(error))
    }
}

function* fetchBucketDetails(action) {
    try {
        const res = yield call(apiHelper.fetchBucketDetails, action.payload)
        yield put(fetchBucketDetailsSuccess(res.data))
    } catch (error) {
        yield put(fetchBucketDetailsError(error))
    }
}


function* fetchLastBuckets(action) {
    try {
        console.log("llego")
        const res = yield call(apiHelper.fetchLastBuckets, action.payload)
        console.log("res.data", res.data)
        yield put(fetchLastBucketsSuccess(res.data))
    } catch (error) {
        yield put(fetchLastBucketsError(error))
    }
}


export default function* bucketsSaga() {
    yield all([
        takeEvery(FETCH_BUCKETS, fetchBuckets),
        takeEvery(SAVE_BUCKET, saveBucket),
        takeEvery(DELETE_BUCKET, deleteBucket),
        takeEvery(ADD_COMMENT, addComment),
        takeEvery(EDIT_COMMENT, editComment),
        takeEvery(DELETE_COMMENT, deleteComment),
        takeEvery(OPEN_SEND_TO_BUCKET_MODAL, openSendBucketModal),
        takeEvery(FETCH_BUCKETS_DETAILS, fetchBucketDetails),
        takeEvery(FETCH_LAST_BUCKETS, fetchLastBuckets),
    ])
}
