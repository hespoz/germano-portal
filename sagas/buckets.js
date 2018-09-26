import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
    FETCH_BUCKETS
} from "../constants";
import apiHelper from '../apiHelper'
import {fetchBucketsError, fetchBucketsLoading, fetchBucketsSuccess} from "../actions/bucketAction";


function* fetchBuckets(action) {
    try {
        console.log(123123)
        yield put(fetchBucketsLoading())
        console.log(action.payload)
        const res = yield call(apiHelper.fetchBuckets, action.payload)
        console.log(res.data)
        yield put(fetchBucketsSuccess(res.data))
    } catch (error) {
        yield put(fetchBucketsError(error))
    }
}


export default function* bucketsSaga() {
    yield all([
        takeEvery(FETCH_BUCKETS, fetchBuckets)
    ])
}
