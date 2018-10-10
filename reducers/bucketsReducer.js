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
    CLOSE_SEND_TO_BUCKET_MODAL,
    OPEN_DELETE_SENTENCE_MODAL,
    CLOSE_DELETE_SENTENCE_MODAL,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_ERROR,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_ERROR,
    DELETE_COMMENT_ERROR,
    DELETE_COMMENT_SUCCESS
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
    addCommentError: null,
    editCommentError: null,
    deleteCommentError: null
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

        case ADD_COMMENT_SUCCESS:

            let bucketsCopy3 = cloneDeep(state.buckets)

            const index3 = findIndex(bucketsCopy3, (b) => b._id === action.payload._id)

            bucketsCopy3[index3] = action.payload

            return {
                ...state,
                buckets: bucketsCopy3,
            }
            break;

        case ADD_COMMENT_ERROR:
            return {
                ...state,
                addCommentError: action.payload
            }
            break;


        case EDIT_COMMENT_SUCCESS:

            let bucketsCopy4 = cloneDeep(state.buckets)

            const index4 = findIndex(bucketsCopy4, (b) => b._id === action.payload._id)

            bucketsCopy4[index4] = action.payload

            return {
                ...state,
                buckets: bucketsCopy4,
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


            console.log(action.payload._id)
            let bucketsCopy5 = cloneDeep(state.buckets)
            const index5 = findIndex(bucketsCopy5, (b) => b._id === action.payload._id)

            console.log(index5)

            if(index5 !== -1) {
                bucketsCopy5[index5] = action.payload
            }

            console.log(state.buckets, bucketsCopy5)
            return {
                ...state,
                buckets: bucketsCopy5,
                deleteCommentError: null
            }
            break;

        case DELETE_COMMENT_ERROR:
            return {
                ...state,
                deleteCommentError: action.payload
            }
            break;



    }

    return state

}
