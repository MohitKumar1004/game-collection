import reducer from "./creditReducer";
import { combineReducers } from "redux";

const combinedReducer= combineReducers({
    coins: reducer
})

export default combinedReducer
