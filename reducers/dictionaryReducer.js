import {
    SEARCH_BY_EXACT_KEYWORD_SUCCESS,
    SEARCH_BY_KEYWORD_SUCCESS,
    CLOSE_SEARCH,
    OPEN_SEARCH,
    SEARCH_BY_KEYWORD_LOADING,
    SEARCH_BY_EXACT_KEYWORD_LOADING,
    ADD_NEW_WORD_CLEAR,
    ADD_NEW_WORD_SUCCESS,
    GO_BACK_WORD_FORM,
    ADD_NEW_WORD_ERROR,
    OPEN_WORDFORM_MODAL,
    CLOSE_WORDFORM_MODAL,
    SEARCH_BY_ID_SUCCESS,
    SEARCH_BY_ID_ERROR,
    FETCH_WORDS_ERROR,
    FETCH_WORDS_SUCCESS,
    FETCH_WORDS_LOADING,
    TOGGLE_VOCABULARY_PRACTICE
} from "../constants";

export default function reducer(state = {
    searchResult:[],
    exactResult:null,
    exactSearchTriggered:false,
    loadingExact:false,
    open:false,
    loading:false,
    successAddWord: false,
    errorAddWord:false,
    wordFormModalOpen: false,
    editIdWord:null,
    wordReferenceData:null,
    searchByIdError:null,
    wordsToPractice:null,
    fetchWordsError:null,
    vocabularyPractice: false
}, action) {
    switch (action.type) {
        case SEARCH_BY_KEYWORD_SUCCESS:
            return {
                ...state,
                searchResult:action.payload,
                loading:false
            }
            break;
        case SEARCH_BY_EXACT_KEYWORD_SUCCESS:
            return {
                ...state,
                exactResult:action.payload,
                loadingExact:false,
                exactSearchTriggered:true
            }
            break;
        case ADD_NEW_WORD_CLEAR:
            return {
                ...state,
                successAddWord: false,
                errorAddWord: false,
                exactResult:null,
                loadingExact:false,
                exactSearchTriggered:false
            }
            break;
        case ADD_NEW_WORD_SUCCESS:
            return {
                ...state,
                successAddWord: true,
                exactResult:action.payload
            }
            break;
        case GO_BACK_WORD_FORM:
            return {
                ...state,
                successAddWord: false,
                editIdWord: state.exactResult._id,
                wordReferenceData:state.exactResult,
                exactResult:null,
            }
            break;
        case ADD_NEW_WORD_ERROR:
            return {
                ...state,
                errorAddWord: true
            }
            break;
        case CLOSE_SEARCH:
            return {
                ...state,
                open:false,
                loading:false,
                exactResult:null,
                loadingExact:false,
                exactSearchTriggered:false,
                successAddWord: false,
                errorAddWord: false
            }
            break;
        case OPEN_SEARCH:
            return {
                ...state,
                open:true,
                searchResult:[]
            }
            break;
        case SEARCH_BY_KEYWORD_LOADING:
            return {
                ...state,
                loading:true
            }
            break;
        case SEARCH_BY_EXACT_KEYWORD_LOADING:
            return {
                ...state,
                loadingExact:true
            }
            break;
        case OPEN_WORDFORM_MODAL:
            return {
                ...state,
                wordFormModalOpen:true,
                editIdWord: action.payload ? action.payload : null
            }
            break;
        case CLOSE_WORDFORM_MODAL:
            return {
                ...state,
                wordFormModalOpen:false,
                wordReferenceData:null,
                editIdWord: null,
                successAddWord: false
            }
            break;
        case SEARCH_BY_ID_SUCCESS:
            return {
                ...state,
                wordReferenceData:action.payload,
                searchByIdError: null
            }
            break;
        case SEARCH_BY_ID_ERROR:
            return {
                ...state,
                searchByIdError: action.payload
            }
            break;
        case FETCH_WORDS_LOADING:
            return {
                ...state,
                loading:true
            }
            break;
        case FETCH_WORDS_SUCCESS:
            return {
                ...state,
                wordsToPractice:action.payload,
                loading: false,
                fetchWordsError: null
            }
            break;
        case FETCH_WORDS_ERROR:
            return {
                ...state,
                fetchWordsError: action.payload
            }
            break;
        case TOGGLE_VOCABULARY_PRACTICE:
            return {
                ...state,
                vocabularyPractice: !state.vocabularyPractice
            }
            break;
        default:
            break;
    }

    return state
}
