import {
    FETCH_BUCKETS,
    FETCH_BUCKETS_LOADING,
    FETCH_BUCKETS_SUCCESS,
    FETCH_BUCKETS_ERROR,
    SAVE_BUCKET,
    SAVE_BUCKET_SUCCESS,
    SAVE_BUCKET_ERROR
} from '../constants'


export const fetchBuckets = (data) => ({
    type: FETCH_BUCKETS,
    payload: data
})

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

export const saveBucket = (data) => ({
    type: SAVE_BUCKET,
    payload: data
})

export const saveBucketSuccess = (data) => ({
    type: SAVE_BUCKET_SUCCESS,
    payload: data
})

export const saveBucketError = (data) => ({
    type: SAVE_BUCKET_ERROR,
    payload: data
})



