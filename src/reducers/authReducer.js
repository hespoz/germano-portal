import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    REGISTER_CLEAR,
    OPEN_AUTH_MODAL,
    CLOSE_AUTH_MODAL,
    TOGGLE_AUTH_FORMS, LOGOUT_SUCCESS
} from "../constants";

const initialState = {
    hasToken:localStorage.getItem("token") ? true : null,
    errorMessageLogin:null,
    errorMessageRegister:null,
    openModal:false,
    showLogin:true
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return {
                ...state,
                hasToken:null
            }
            break;
        case LOGIN_SUCCESS:
            return {
                ...state,
                errorMessageLogin:null,
                hasToken:true
            }
            break;
        case LOGIN_ERROR:
            return {
                ...state,
                errorMessageLogin:action.payload.message,
                hasToken:null
            }
            break;
        case REGISTER_SUCCESS:
            return {
                ...state,
                errorMessageRegister:null,
                hasToken:true
            }
            break;
        case REGISTER_ERROR:
            return {
                ...state,
                errorMessageRegister:action.payload.message,
                hasToken: null
            }
            break;
        case REGISTER_CLEAR:
            return {
                ...state,
                errorMessageRegister:null,
                openModal:false,
                showLogin:true
            }
            break;
        case OPEN_AUTH_MODAL:
            return {
                ...state,
                openModal: true,
                showLogin:true,
                errorMessageRegister:null,
                errorMessageLogin:null
            }
            break;
        case CLOSE_AUTH_MODAL:
            return {
                ...state,
                openModal: false,
                showLogin:true,
                errorMessageRegister:null,
                errorMessageLogin:null
            }
            break;
        case TOGGLE_AUTH_FORMS:
            return {
                ...state,
                showLogin:!state.showLogin
            }
            break;
        default:
            break;
    }

    return state
}
