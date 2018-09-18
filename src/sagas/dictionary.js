import { put, call, takeEvery, all } from 'redux-saga/effects';
import { SEARCH_BY_KEYWORD, SEARCH_BY_EXACT_KEYWORD, ADD_NEW_WORD } from "../constants";
import apiHelper from '../apiHelper'

import {
    searchByExactKeywordLoading,
    searchByExactKeywordSuccess,
    searchByExactKeywordError,
    searchByKeywordLoading,
    searchByKeywordSuccess,
    searchByKeywordError,
    addNewWordSuccess,
    addNewWordError
} from '../actions/dictionaryAction';

function* searchByKeyword(action) {
    try {
        yield put(searchByKeywordLoading())
        let result = []
        if(action.payload.keyword !== '') {
            const res = yield call(apiHelper.searchByKeyword, action.payload)
            result = res.data
        }
        yield put(searchByKeywordSuccess(result))
    } catch (error) {
        yield put(searchByKeywordError(error))
    }
}

function* searchByExactKeyword(action) {
    try {
        yield put(searchByExactKeywordLoading())
        let result = []
        if(action.payload.keyword !== '') {
            const res = yield call(apiHelper.searchByExactKeyword, action.payload)
            result = res.data
        }
        yield put(searchByExactKeywordSuccess(result))
    } catch (error) {
        yield put(searchByExactKeywordError(error))
    }
}

function* addNewWord(action) {
    try {
        const res = yield call(apiHelper.addNewWord, action.payload)
        yield put(addNewWordSuccess(res.data))
    } catch (error) {
        yield put(addNewWordError(error))
    }
}

export default function* dictionarySaga() {
    yield all([
        takeEvery(SEARCH_BY_KEYWORD, searchByKeyword),
        takeEvery(SEARCH_BY_EXACT_KEYWORD, searchByExactKeyword),
        takeEvery(ADD_NEW_WORD, addNewWord)
    ])
}
