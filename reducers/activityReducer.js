import {
    FETCH_ACTIVITY_SUCCESS,
    FETCH_ACTIVITY_ERROR
} from '../constants'

export default function reducer(state = {
    activities:[],
    fetchActivitiesError: null
}, action) {

    switch(action.type){
        case FETCH_ACTIVITY_SUCCESS:
            return {
                ...state,
                activities: action.payload
            }

        case FETCH_ACTIVITY_ERROR:
            return {
                ...state,
                activities: [],
                fetchActivitiesError: null
            }

        default:
            break;
    }



    return state
}
