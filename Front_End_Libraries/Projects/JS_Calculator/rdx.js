import { myParse } from './calculator_parse.js';

const APPEND_event = 'APPEND_event';
const CLEAR_event = 'CLEAR_event';
const CALC_event = 'CALC_event';

const defaultState = {
    display: {
        fullDisplay: '0',
        curNumber: '0', 
        newCalc: false
    }
}

const appendAction = function (str) {
    return { type: APPEND_event, str: str };
}
const clearAction = function () {
    return { type: CLEAR_event, str: 'C' };
}
const calcAction = function () {
    return { type: CALC_event, str: '=' };
}

const displayParser = function (state = defaultState.display, action) {
    switch (action.type) {
        case APPEND_event: case CLEAR_event: case CALC_event:
            var ret = myParse(state, action.str);
            return ret;
        default:
            return state;
    }
}

var store = Redux.createStore(Redux.combineReducers({
    display: displayParser
}));
store.subscribe(function () {
    console.log('Redux Store:', store.getState());
})

export { store, appendAction, clearAction, calcAction }; 