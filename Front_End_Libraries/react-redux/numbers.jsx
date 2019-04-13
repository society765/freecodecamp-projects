import { store, numInc, numDec, numRes } from './rdx.js';

class MyNumbers extends React.Component {
    constructor(props) {
        super(props);

        this.inc = this.inc.bind(this); 
        this.dec = this.dec.bind(this); 
        this.res = this.res.bind(this); 
    }

    inc(){this.props.inc(1); }
    dec(){this.props.dec(1); }
    res(){this.props.res(); }

    render() {
        return (
            <div className='row'>
                <div className="col align-self-center">Value: {this.props.number}</div>
                <div className="col-2"><button className="btn btn-primary btn-block" onClick={this.inc}>Increment</button></div>
                <div className="col-2"><button className="btn btn-primary btn-block" onClick={this.dec}>Decrement</button></div>
                <div className="col-2"><button className="btn btn-primary btn-block" onClick={this.res}>Reset</button></div>
            </div>
        );
    }
}

const mapStateToProps = function(state){ 
    return {number: state.number}; 
}
const mapDispatchToProps = function(dispatch){ 
    return {
        inc: function(val){ dispatch((numInc(val))); }, 
        dec: function(val){ dispatch((numDec(val))); }, 
        res: function(){ dispatch((numRes())); }
    }
}

const Provider = ReactRedux.Provider; 
const connect = ReactRedux.connect; 

const MyNumbersC = connect(mapStateToProps, mapDispatchToProps)(MyNumbers); 

class MyNumbersWrapper extends React.Component {
    render(){
        return (
            <Provider store={store}> 
                <MyNumbersC/> 
            </Provider>
        ); 
    }
}

ReactDOM.render(<MyNumbersWrapper/>, document.getElementById('counter')); 