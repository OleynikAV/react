import {combineReducers} from "redux";
import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import {itemsReducer, userReducer} from "./itemsStore";

const rootReducer = combineReducers({
    storeItems: itemsReducer,
    storeUsers: userReducer,
})
const  store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
export  default store
