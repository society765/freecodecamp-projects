var md = window.markdownit({breaks: true}); 
const CHANGE = 'CHANGE'; 

const defaultState = {
    text: ''
}

const changeAction = function(text){ return {type: CHANGE, text: text} }

const textReducer = function(state = defaultState.text, action){ 
    switch (action.type){ 
        case CHANGE: return md.render(action.text); 
        /*
        return marked(action.text, 
            {breaks: true, gfm: true}
            ); 
            */
        default: return state; 
    }
}

var store = Redux.createStore(Redux.combineReducers({
    text: textReducer
}))
store.subscribe(
    function(){
        console.log(store.getState()); 
    }
)

export {store, changeAction}; 

