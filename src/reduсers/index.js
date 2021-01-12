import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import itemsStore from "./itemsStore";

const rootReducer = combineReducers({
    items : itemsStore,
})
const  store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
export  default store
