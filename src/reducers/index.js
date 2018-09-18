
import { combineReducers } from "redux"

import dictionary from "./dictionaryReducer"
import auth from "./authReducer"

export default combineReducers({
    dictionary,
    auth
})
