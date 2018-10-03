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
    OPEN_SEND_TO_BUCKET_MODAL,
    CLOSE_SEND_TO_BUCKET_MODAL, OPEN_DELETE_SENTENCE_MODAL, CLOSE_DELETE_SENTENCE_MODAL
} from "../constants";
import {map, cloneDeep, find, findIndex} from "lodash"

export default function reducer(state = {
    buckets: [],
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
                buckets: action.payload,
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
            let bucketsCopy = cloneDeep(state.buckets)

            const updated = find(bucketsCopy, (b) => b._id === action.payload._id)

            if(updated){
                bucketsCopy = map(state.buckets, (bucket, index) => {
                    if(bucket._id === action.payload._id){
                        bucket = action.payload
                    }
                    return bucket
                })
            } else {
                bucketsCopy.push(action.payload)
            }


            return {
                ...state,
                buckets: bucketsCopy,
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

            let bucketsCopy1 = cloneDeep(state.buckets)
            const index = findIndex(bucketsCopy1, (b) => b._id === action.payload._id)

            if(index !== -1) {
                if(bucketsCopy1[index]) {
                    bucketsCopy1.splice(index, 1)
                }
            }

            return {
                ...state,
                buckets: bucketsCopy1,
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


        case OPEN_SEND_TO_BUCKET_MODAL:
            return {
                ...state,
                openSendToBucketModal: true,
                wordIdForSendToBucket: action.payload
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


    }

    return state

}
