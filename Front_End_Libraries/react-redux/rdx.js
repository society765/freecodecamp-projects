const ADD = 'ADD'; 
const RESET = 'RESET'; 
const NUM_INC = 'NUM_INC'; 
const NUM_DEC = 'NUM_DEC'; 
const NUM_RES = 'NUM_RES'; 

const defaultState = {
    message: [], 
    number: 0, 
    whatever: 0, 
    wheee: [], 
    neverPassedToReducers: ''
}; 

const addMessage = function(mes){ return {type: ADD, message: mes}; }
const resetMessage = function(){ return {type: RESET}; }

const messageReducer = function(message = defaultState.message, action){
    console.log('messageReducer receives: message =', message, ', action =', action); 
    switch (action.type){ 
        case ADD: 
            var new_message = [...message, action.message]; 
            return new_message; 
        case RESET: 
            return []; 
        default: 
            return message; 
    }
}

const numInc = function(val){return {type: NUM_INC, val: val}; }
const numDec = function(val){return {type: NUM_DEC, val: val}; }
const numRes = function(){return {type: NUM_RES}; }

const numberReducer = function(number = defaultState.number, action){ 
    console.log('numberReducer receives: number =', number, ', action =', action); 
    var newNumber = number; 
    switch(action.type){ 
        case NUM_INC: newNumber += action.val; break; 
        case NUM_DEC: newNumber -= action.val; break; 
        case NUM_RES: newNumber = 0; break; 
        default: return number;
    }
    return newNumber; 
}

var store = Redux.createStore(Redux.combineReducers({
    message: messageReducer, 
    number: numberReducer
})); 
store.subscribe(()=>{
    var sgs = store.getState();
    console.log('Redux store:', sgs); 
})

export {store, addMessage, resetMessage, numInc, numDec, numRes}; 