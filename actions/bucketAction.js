import {
    FETCH_BUCKETS,
    FETCH_BUCKETS_LOADING,
    FETCH_BUCKETS_SUCCESS,
    FETCH_BUCKETS_ERROR
} from '../constants'



export const fetchBuckets = (data) => {
    return {
        type: FETCH_BUCKETS,
        payload: data
    }}

export const fetchBucketsLoading = () => ({
    type: FETCH_BUCKETS_LOADING
})

export const fetchBucketsSuccess = (data) => ({
    type: FETCH_BUCKETS_SUCCESS,
    payload: data
})

export const fetchBucketsError = (data) => ({
    type: FETCH_BUCKETS_ERROR,
    payload: data
})


