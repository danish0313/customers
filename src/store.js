import {createStore , applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const initalState = {} ; 
const middleware = [thunk];

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : null || compose;
const store = createStore(rootReducer , initalState , compose(
        applyMiddleware(...middleware),
        composeEnhancers
)
);

export default store;