import {
    FETCH_BUCKETS_LOADING,
    FETCH_BUCKETS_ERROR,
    FETCH_BUCKETS_SUCCESS,
    SAVE_BUCKET_SUCCESS,
    SAVE_BUCKET_ERROR,
    OPEN_BUCKET_MODAL,
    CLOSE_BUCKET_MODAL,
    OPEN_DELETE_BUCKET_MODAL,
    CLOSE_DELETE_BUCKET_MODAL,
    DELETE_BUCKET_SUCCESS,
    DELETE_BUCKET_ERROR,
    CLOSE_SEND_TO_BUCKET_MODAL,
    OPEN_DELETE_SENTENCE_MODAL,
    CLOSE_DELETE_SENTENCE_MODAL,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_ERROR,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_ERROR,
    DELETE_COMMENT_ERROR,
    DELETE_COMMENT_SUCCESS,
    OPEN_SEND_TO_BUCKET_MODAL_SUCCESS,
    FETCH_BUCKETS_DETAILS_SUCCESS,
    FETCH_BUCKETS_DETAILS_ERROR
} from "../constants";
import {map, cloneDeep, find, findIndex} from "lodash"

export default function reducer(state = {
    buckets: [],
    bucketOwnerName:null,
    fetchBucketsError: null,
    saveBucketsError: null,
    openBucketModal: false,
    wordIdForNewBucket: null,
    openDeleteBucketModal: false,
    bucketIdForDelete: null,
    deleteBucketsError: null,
    openSendToBucketModal: false,
    wordIdForSendToBucket: null,
    openDeleteSentenceModal: false,
    sentenceIdForDelete: null,
    addCommentError: null,
    editCommentError: null,
    deleteCommentError: null,
    bucketDetail: null,
    fetchBucketDetailsError:null,
}, action) {
    switch (action.type) {

        case FETCH_BUCKETS_LOADING:
            return {
                ...state,
                loading: true
            }
            break;

        case FETCH_BUCKETS_ERROR:
            return {
                ...state,
                fetchBucketsError: action.payload
            }
            break;

        case FETCH_BUCKETS_SUCCESS:
            return {
                ...state,
                buckets: action.payload.buckets,
                bucketOwnerName: action.payload.username,
                loading: false,
                fetchBucketsError: null
            }
            break;

        case SAVE_BUCKET_ERROR:
            return {
                ...state,
                saveBucketsError: action.payload,
                openBucketModal: false,
                wordIdForNewBucket: null
            }
            break;

        case SAVE_BUCKET_SUCCESS:

            return {
                ...state,
                buckets: saveBucket(state, action.payload),
                bucketDetail: action.payload,
                loading: false,
                saveBucketsError: null,
                openBucketModal: false,
                wordIdForNewBucket: null,
                openSendToBucketModal: false,
                wordIdForSendToBucket: null,
                openDeleteSentenceModal: false,
                sentenceIdForDelete: null
            }

            break;

        case OPEN_BUCKET_MODAL:
            return {
                ...state,
                openBucketModal: true,
                wordIdForNewBucket: action.payload
            }
            break;

        case CLOSE_BUCKET_MODAL:
            return {
                ...state,
                openBucketModal: false,
                wordIdForNewBucket: null
            }
            break;

        case OPEN_DELETE_BUCKET_MODAL:
            return {
                ...state,
                openDeleteBucketModal: true,
                bucketIdForDelete: action.payload
            }
            break;

        case CLOSE_DELETE_BUCKET_MODAL:
            return {
                ...state,
                openDeleteBucketModal: false,
                bucketIdForDelete: null
            }
            break;

        case DELETE_BUCKET_SUCCESS:

            return {
                ...state,
                buckets: deleteBucket(state, action.payload),
                openDeleteBucketModal: false,
                bucketIdForDelete: null,
                deleteBucketsError: null
            }
            break;

        case DELETE_BUCKET_ERROR:
            return {
                ...state,
                deleteBucketsError: action.payload
            }
            break;


        case OPEN_SEND_TO_BUCKET_MODAL_SUCCESS:
            return {
                ...state,
                openSendToBucketModal: true,
                wordIdForSendToBucket: action.payload.wordId,
                buckets: action.payload.buckets,
                bucketOwnerName: action.payload.username
            }
            break;

        case CLOSE_SEND_TO_BUCKET_MODAL:
            return {
                ...state,
                openSendToBucketModal: false,
                wordIdForSendToBucket: null
            }
            break;


        case OPEN_DELETE_SENTENCE_MODAL:
            return {
                ...state,
                openDeleteSentenceModal: true,
                sentenceIdForDelete: action.payload
            }
            break;

        case CLOSE_DELETE_SENTENCE_MODAL:
            return {
                ...state,
                openDeleteSentenceModal: false,
                sentenceIdForDelete: null
            }
            break;

        case ADD_COMMENT_SUCCESS:

            return {
                ...state,
                buckets: addEditComment(state, action.payload),
                bucketDetail: action.payload
            }
            break;

        case ADD_COMMENT_ERROR:
            return {
                ...state,
                addCommentError: action.payload
            }
            break;


        case EDIT_COMMENT_SUCCESS:

            return {
                ...state,
                buckets: addEditComment(state, action.payload),
                bucketDetail: action.payload,
                editCommentError: null
            }

            break;

        case EDIT_COMMENT_ERROR:
            return {
                ...state,
                editCommentError: action.payload
            }
            break;

        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                buckets: deleteComment(state, action.payload),
                bucketDetail: action.payload,
                deleteCommentError: null
            }
            break;

        case DELETE_COMMENT_ERROR:
            return {
                ...state,
                deleteCommentError: action.payload
            }
            break;


        case FETCH_BUCKETS_DETAILS_ERROR:
            return {
                ...state,
                fetchBucketDetailsError: action.payload
            }
            break;

        case FETCH_BUCKETS_DETAILS_SUCCESS:
            return {
                ...state,
                bucketDetail: action.payload,
                fetchBucketDetailsError: null
            }
            break;

    }

    return state

}

const saveBucket = (state, payload) => {
    let bucketsCopy = cloneDeep(state.buckets)

    const updated = find(bucketsCopy, (b) => b._id === payload._id)

    if(updated){
        bucketsCopy = map(state.buckets, (bucket, index) => {
            if(bucket._id === payload._id){
                bucket = payload
            }
            return bucket
        })
    } else {
        bucketsCopy.push(payload)
    }

    return bucketsCopy
}

const deleteBucket = (state, payload) => {
    let bucketsCopy = cloneDeep(state.buckets)
    const index = findIndex(bucketsCopy, (b) => b._id === payload._id)

    if(index !== -1) {
        if(bucketsCopy[index]) {
            bucketsCopy.splice(index, 1)
        }
    }

    return bucketsCopy
}

const addEditComment = (state, payload) => {
    let bucketsCopy = cloneDeep(state.buckets)

    const index = findIndex(bucketsCopy, (b) => b._id === payload._id)

    bucketsCopy[index] = payload

    return bucketsCopy

}

const deleteComment = (state, payload) => {
    let bucketsCopy = cloneDeep(state.buckets)
    const index = findIndex(bucketsCopy, (b) => b._id === payload._id)

    if(index !== -1) {
        bucketsCopy[index] = payload
    }

    return bucketsCopy
}
