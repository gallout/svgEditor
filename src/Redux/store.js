import { createStore, combineReducers, applyMiddleware } from 'redux';
import submittedValueReducer from './reducers/submittedValueReducer';
import reducers from './reducers/combinedReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// combineReducers takes in multiple reducers, and returns a single reducer to be used in the createStore(...) function.
// combineReducers takes in multiple 'key : value' pairs to combine the reducers.
// The key is the name of variable within state (in the redux store), and the value is the reducer used to change that variable.
const allReducers = combineReducers({
    submittedValue: submittedValueReducer
});

// createStore takes in 3 parameters: 1. Reducer 2. preloadedState 3. Enhancer.
// In this case: 
// 1. Is the allReducer defined above
// 2. Are the intial values of the state within the redux store
// 3. Allows the store to be viewed within the Redux Tools Extension, a recommended tool when working with Redux.
// https://redux.js.org/api/createstore
export const store = createStore(
    reducers,
     /*,
    
    {
        submittedValue: ')sdrawkcaB ti daeR( Nothing has been submitted yet'
    }, */
    composeWithDevTools(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
);

store.subscribe(() => {console.log('subscribe', store.getState())} )


