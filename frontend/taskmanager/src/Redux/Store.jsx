import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { userReducers, taskReducers } from './Reducers'
const reducers = combineReducers({
    userReducers,
    taskReducers
})
const store = createStore(reducers, applyMiddleware(thunk))
export default store