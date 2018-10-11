import {
    FETCH_BUCKETS,
    FETCH_BUCKETS_LOADING,
    FETCH_BUCKETS_SUCCESS,
    FETCH_BUCKETS_ERROR,
    SAVE_BUCKET,
    SAVE_BUCKET_SUCCESS,
    SAVE_BUCKET_ERROR,
    OPEN_BUCKET_MODAL,
    CLOSE_BUCKET_MODAL,
    OPEN_DELETE_BUCKET_MODAL,
    CLOSE_DELETE_BUCKET_MODAL,
    DELETE_BUCKET, DELETE_BUCKET_SUCCESS,
    DELETE_BUCKET_ERROR, OPEN_SEND_TO_BUCKET_MODAL, CLOSE_SEND_TO_BUCKET_MODAL,
    OPEN_DELETE_SENTENCE_MODAL,
    CLOSE_DELETE_SENTENCE_MODAL, ADD_COMMENT, ADD_COMMENT_SUCCESS, ADD_COMMENT_ERROR,
    EDIT_COMMENT,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_ERROR,
    DELETE_COMMENT,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_ERROR,
    OPEN_SEND_TO_BUCKET_MODAL_SUCCESS,
    OPEN_SEND_TO_BUCKET_MODAL_ERROR,
    FETCH_BUCKETS_DETAILS,
    FETCH_BUCKETS_DETAILS_SUCCESS,
    FETCH_BUCKETS_DETAILS_ERROR
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

export const openBucketModal = (data) => ({
    type: OPEN_BUCKET_MODAL,
    payload: data
})

export const closeBucketModal = () => ({
    type: CLOSE_BUCKET_MODAL
})

export const openDeleteBucketModal = (data) => ({
    type: OPEN_DELETE_BUCKET_MODAL,
    payload: data
})

export const closeDeleteBucketModal = () => ({
    type: CLOSE_DELETE_BUCKET_MODAL
})

export const deleteBucket = (data) => ({
    type: DELETE_BUCKET,
    payload: data
})

export const deleteBucketSuccess = (data) => ({
    type: DELETE_BUCKET_SUCCESS,
    payload: data
})

export const deleteBucketError = (data) => ({
    type: DELETE_BUCKET_ERROR,
    payload: data
})

export const openSendToBucketModal = (data) => ({
    type: OPEN_SEND_TO_BUCKET_MODAL,
    payload: data
})

export const openSendToBucketModalSuccess = (data) => ({
    type: OPEN_SEND_TO_BUCKET_MODAL_SUCCESS,
    payload: data
})

export const openSendToBucketModalError = (data) => ({
    type: OPEN_SEND_TO_BUCKET_MODAL_ERROR,
    payload: data
})

export const closeSendToBucketModal = () => ({
    type: CLOSE_SEND_TO_BUCKET_MODAL
})

export const openDeleteSentenceModal = (data) => ({
    type: OPEN_DELETE_SENTENCE_MODAL,
    payload: data
})

export const closeDeleteSentenceModal = () => ({
    type: CLOSE_DELETE_SENTENCE_MODAL
})


export const addComment = (data) => ({
    type: ADD_COMMENT,
    payload: data
})

export const addCommentSuccess = (data) => ({
    type: ADD_COMMENT_SUCCESS,
    payload: data
})

export const addCommentError = (data) => ({
    type: ADD_COMMENT_ERROR,
    payload: data
})

export const editComment = (data) => ({
    type: EDIT_COMMENT,
    payload: data
})

export const editCommentSuccess = (data) => ({
    type: EDIT_COMMENT_SUCCESS,
    payload: data
})

export const editCommentError = (data) => ({
    type: EDIT_COMMENT_ERROR,
    payload: data
})

export const deleteComment = (data) => ({
    type: DELETE_COMMENT,
    payload: data
})

export const deleteCommentSuccess = (data) => ({
    type: DELETE_COMMENT_SUCCESS,
    payload: data
})

export const deleteCommentError = (data) => ({
    type: DELETE_COMMENT_ERROR,
    payload: data
})

export const fetchBucketDetails = (data) => ({
    type: FETCH_BUCKETS_DETAILS,
    payload: data
})

export const fetchBucketDetailsSuccess = (data) => ({
    type: FETCH_BUCKETS_DETAILS_SUCCESS,
    payload: data
})

export const fetchBucketDetailsError = () => ({
    type: FETCH_BUCKETS_DETAILS_ERROR,
    payload:data
})


