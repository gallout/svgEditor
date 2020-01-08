import { combineReducers } from 'redux';
import svgEditorReducer from './svgEditorReducer'

// combineReducers takes in multiple reducers, and returns a single reducer to be used in the createStore(...) function.
// combineReducers takes in multiple 'key : value' pairs to combine the reducers.
// The key is the name of variable within state (in the redux store), and the value is the reducer used to change that variable.

export default combineReducers({ 
    svgEditor: svgEditorReducer
})