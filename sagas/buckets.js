import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
    FETCH_BUCKETS,
    SAVE_BUCKET,
    DELETE_BUCKET
} from "../constants";
import apiHelper from '../apiHelper'
import {fetchBucketsError, fetchBucketsLoading, fetchBucketsSuccess, saveBucketError, saveBucketSuccess, deleteBucketSuccess, deleteBucketError} from "../actions/bucketAction";


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

export default function* bucketsSaga() {
    yield all([
        takeEvery(FETCH_BUCKETS, fetchBuckets),
        takeEvery(SAVE_BUCKET, saveBucket),
        takeEvery(DELETE_BUCKET, deleteBucket)
    ])
}
