// import Redux, { createStore } from '../../frameworks/redux'; 

const INC = 'INC'; 
const DEC = 'DEC'; 
const RES = 'RES'; 

const countReducer = function(state = {count: 0}, action){ 
    var val; 
    if('val' in action) val = action.val; 
    else val = 1; 

    switch (action.type){ 
        case INC: return Object.assign({}, state, {count: state.count+val}); 
        case DEC: return Object.assign({}, state, {count: state.count-val}); 
        case RES: return Object.assign({}, state, {count: 0}); 
    }
}

store = Redux.createStore(countReducer); 

console.log(store.getState()); 

store.dispatch({type: INC, val: 3}); 
store.dispatch({type: INC, val: 4}); 
store.dispatch({type: INC}); 
store.dispatch({type: INC}); 

console.log(store.getState()); 

store.dispatch({type: DEC, val: 2}); 
store.dispatch({type: DEC}); 

console.log(store.getState()); 

store.dispatch({type: RES}); 

console.log(store.getState()); 