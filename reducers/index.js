import { combineReducers } from "redux"

import { reducer as formReducer } from 'redux-form'
import dictionary from "./dictionaryReducer"
import auth from "./authReducer"
import buckets from "./bucketsReducer"
import activity from "./activityReducer"
import user from "./userReducer"

export default combineReducers({
    dictionary,
    auth,
    buckets,
    activity,
    user,
    form: formReducer
})
