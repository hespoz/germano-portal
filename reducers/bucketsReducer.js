import {
    FETCH_BUCKETS_LOADING,
    FETCH_BUCKETS_ERROR,
    FETCH_BUCKETS_SUCCESS,
    SAVE_BUCKET_SUCCESS,
    SAVE_BUCKET_ERROR
} from "../constants";
import {map, cloneDeep} from "lodash"

export default function reducer(state = {
    buckets: [],
    fetchBucketsError: null,
    saveBucketsError: null
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
                saveBucketsError: action.payload
            }
            break;

        case SAVE_BUCKET_SUCCESS:
            let bucketsCopy = cloneDeep(state.buckets)
            bucketsCopy = map(state.buckets, (bucket, index) => {
                if(bucket._id === action.payload._id){
                    bucket = action.payload
                }
                return bucket
            })

            return {
                ...state,
                buckets: bucketsCopy,
                loading: false,
                saveBucketsError: null
            }
            break;

    }

    return state

}
