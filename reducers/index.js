
import { combineReducers } from "redux"

import { reducer as formReducer } from 'redux-form'
import dictionary from "./dictionaryReducer"
import auth from "./authReducer"
import buckets from "./bucketsReducer"

export default combineReducers({
    dictionary,
    auth,
    buckets,
    form: formReducer
})
