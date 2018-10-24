import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import dictionarySaga from './sagas/dictionary';
import authSaga from './sagas/auth';
import bucketsSaga from './sagas/buckets';
import activitySaga from './sagas/activity';
import userSaga from './sagas/user';

export const sagaMiddleware = createSagaMiddleware();

export default function* rootSaga() {
    yield all([
        dictionarySaga(),
        authSaga(),
        bucketsSaga(),
        activitySaga(),
        userSaga()
    ]);
}
