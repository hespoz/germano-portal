import {
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_ERROR,
    SAVE_USER_INFO_SUCCESS,
    SAVE_USER_INFO_ERROR
} from "../constants";

export default function reducer(state = {
    userInfo:null,
    userInfoError:null,
    updateUserInfoSuccess:false,
    updateUserInfoError:null
}, action) {
    switch (action.type) {
        case FETCH_USER_INFO_SUCCESS:
            return {
                ...state,
                userInfo:action.payload,
                userInfoError:null
            }
            break;
        case FETCH_USER_INFO_ERROR:
            return {
                ...state,
                userInfoError:action.payload.message
            }
            break;
        case SAVE_USER_INFO_SUCCESS:
            return {
                ...state,
                updateUserInfoSuccess:action.payload,
                updateUserInfoError:null
            }
            break;
        case SAVE_USER_INFO_ERROR:
            return {
                ...state,
                updateUserInfoSuccess:false,
                updateUserInfoError:action.payload.message
            }
            break;
    }

    return state
}