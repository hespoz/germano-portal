import {
    FETCH_ACTIVITY,
    FETCH_ACTIVITY_SUCCESS,
    FETCH_ACTIVITY_ERROR
} from '../constants'


export const fetchActivity = (data) => ({
    type: FETCH_ACTIVITY,
    payload: data
})

export const fetchActivitySuccess = (data) => ({
    type: FETCH_ACTIVITY_SUCCESS,
    payload: data
})

export const fetchActivityError = (data) => ({
    type: FETCH_ACTIVITY_ERROR,
    payload: data
})

