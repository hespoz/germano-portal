
import { combineReducers } from "redux"

import { reducer as formReducer } from 'redux-form'
import dictionary from "./dictionaryReducer"
import auth from "./authReducer"

export default combineReducers({
    dictionary,
    auth,
    form: formReducer
})
