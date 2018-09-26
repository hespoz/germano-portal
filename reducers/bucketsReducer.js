import {
    FETCH_BUCKETS_LOADING,
    FETCH_BUCKETS_ERROR,
    FETCH_BUCKETS_SUCCESS
} from "../constants";

export default function reducer(state = {
    buckets: [],
    fetchBucketsError: null
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

    }

    return state

}
