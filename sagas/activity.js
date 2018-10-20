import { put, call, takeEvery, all } from 'redux-saga/effects';
import {FETCH_ACTIVITY} from "../constants";
import apiHelper from "../apiHelper";
import {fetchActivityError, fetchActivitySuccess} from "../actions/activityAction";

function* fetchActivity(action) {
    try {
        const res = yield call(apiHelper.fetchActivity, action.payload)
        yield put(fetchActivitySuccess(res.data))
    } catch (error) {
        yield put(fetchActivityError(error))
    }
}

export default function* activitySaga() {
    yield all([
        takeEvery(FETCH_ACTIVITY, fetchActivity)
    ])
}
