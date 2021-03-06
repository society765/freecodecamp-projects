const STARTFETCH = 'STARTFETCH';
const ENDFETCH = 'ENDFETCH';

const defaultState = {
    quotes: {},
    status: ''
}

const getQuote = function (func) {
    func();
    return { type: STARTFETCH };
}
const endFetch = function (author, quote) {
    return { type: ENDFETCH, quote: quote, author: author };
}

const statusReducer = function (state = defaultState.status, action) {
    switch (action.type) {
        case STARTFETCH: return ' fetching... ';
        case ENDFETCH: return '';
        default: return state;
    }
}
const quoteReducer = function (state = defaultState.quotes, action) {
    switch (action.type) {
        case STARTFETCH: return state;
        case ENDFETCH: return { quote: action.quote, author: action.author };
        default: return state;
    }
}

var store = Redux.createStore(Redux.combineReducers({
    status: statusReducer,
    quotes: quoteReducer
}));
store.subscribe(function () {
    console.log('Redux store:', store.getState());
})

export { store, getQuote, endFetch }; 