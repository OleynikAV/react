import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    items: require('./itemsStore').default,
})
const  store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
export  default store
