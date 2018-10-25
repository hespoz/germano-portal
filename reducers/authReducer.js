import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    REGISTER_CLEAR,
    OPEN_AUTH_MODAL,
    CLOSE_AUTH_MODAL,
    LOGOUT_SUCCESS,
    GET_TOKEN,
    CONFIRM_USER_SUCCESS,
    CONFIRM_USER_ERROR, VERIFICATION_STATUS_SUCCESS, VERIFICATION_STATUS_ERROR,
    RESEND_VERIFICATION_EMAIL_SUCCESS,
    RESEND_VERIFICATION_EMAIL_ERROR,
    LOGIN_FORM,
    SET_AUTH_FORM,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    RECOVER_PASSWORD_SUCCESS,
    RECOVER_PASSWORD_ERROR
} from "../constants";

import Cookies from 'js-cookie'

const initialState = {
    hasToken:false,
    userId: null,
    userName: null,
    email: null,
    errorMessageLogin:null,
    errorMessageRegister:null,
    errorMessageRecoveryPassword:null,
    errorMessageResetPassword:null,
    resetPasswordSuccess:null,
    openModal:false,
    verified:true,
    confirmUserError:null,
    resendedEmail:false,
    resendVerificationError:null,
    authForm: LOGIN_FORM,
    recoverPasswordSuccess:null,
    recoverPasswordError:null
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return {
                ...state,
                hasToken: null,
                userId: null,
                userName: null,
                verified:true,
                resendedEmail:false,
                resendVerificationError:null
            }
            break;
        case LOGIN_SUCCESS:
            return {
                ...state,
                errorMessageLogin:null,
                hasToken:true,
                userId: Cookies.get('userId'),
                userName: Cookies.get('userName'),
                email:action.payload.email,
                verified: action.payload.verified
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
                hasToken:true,
                userId: Cookies.get('userId'),
                userName: Cookies.get('userName'),
                verified: false
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
                authForm: LOGIN_FORM
            }
            break;
        case OPEN_AUTH_MODAL:
            return {
                ...state,
                openModal: true,
                authForm:action.payload,
                errorMessageRegister:null,
                errorMessageLogin:null
            }
            break;
        case CLOSE_AUTH_MODAL:
            return {
                ...state,
                openModal: false,
                authForm: LOGIN_FORM,
                errorMessageRegister:null,
                errorMessageLogin:null
            }
            break;
        case SET_AUTH_FORM:
            return {
                ...state,
                authForm:action.payload
            }
            break;
        case GET_TOKEN:
            return {
                ...state,
                hasToken: Cookies.get('token') !== undefined && Cookies.get('token') !== null,
                userId: Cookies.get('userId'),
                userName: Cookies.get('userName'),
                email:Cookies.get('email'),
            }

            break;

        case CONFIRM_USER_SUCCESS:

            return {
                ...state,
                verified:action.payload,
                confirmUserError:null
            }
            break;

        case CONFIRM_USER_ERROR:
            return {
                ...state,
                confirmUserError:action.payload
            }
            break;

        case VERIFICATION_STATUS_SUCCESS:

            return {
                ...state,
                verified:action.payload,
                confirmUserError:null
            }
            break;

        case VERIFICATION_STATUS_ERROR:
            return {
                ...state,
                confirmUserError:action.payload
            }
            break;

        case RESEND_VERIFICATION_EMAIL_SUCCESS:

            return {
                ...state,
                resendedEmail:action.payload,
                resendVerificationError:null
            }
            break;

        case RESEND_VERIFICATION_EMAIL_ERROR:
            return {
                ...state,
                resendVerificationError:action.payload
            }
            break;

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: true,
                errorMessageResetPassword: null
            }
            break;

        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                resetPasswordSuccess: null,
                errorMessageResetPassword: action.payload.message
            }
            break;


        case RECOVER_PASSWORD_SUCCESS:
            return {
                ...state,
                recoverPasswordSuccess: action.payload,
                recoverPasswordError: null
            }
            break;

        case RECOVER_PASSWORD_ERROR:
            return {
                ...state,
                recoverPasswordSuccess: null,
                recoverPasswordError: action.payload.message
            }
            break;


        default:
            break;
    }

    return state
}
