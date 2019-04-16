import * as rdx from './rdx.js';

class Calc extends React.Component {
    constructor(props) {
        super(props)

        this.appendDisplay = this.appendDisplay.bind(this);
        this.keypressHandle = this.keypressHandle.bind(this); 
    }

    appendDisplay(event) {
        this.props.appendAction(event.target.name);
    }

    keypressHandle(event){
        // console.log(event.key); 
        if (event.key == '=' || event.key == 'Enter'){ 
            this.props.calcAction(); 
        } else if (event.key == 'c' || event.key == 'C'){ 
            this.props.clearAction(); 
        } else if ('1234567890+-*/.'.includes(event.key)){ 
            this.props.appendAction(event.key); 
        }
    }

    componentDidMount(){
        window.addEventListener('keydown', this.keypressHandle); 
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.keypressHandle); 
    }

    render() {
        return (
            <div className='container' id='calc-container'>
                <div id="display-formula-row" className="row">
                    <div id="display-formula" className='col text-right pr-1 overflow-auto'>{this.props.fullDisplay}</div>
                </div>
                <div id="display-row" className="row">
                    <div id="display" className='col text-right pr-1 overflow-auto'>{this.props.curNumber}</div>
                </div>
                <div id="first-row" className="row calc-row-button">
                    <button className="col-6 calc-button btn btn-danger" id='clear' onClick={this.props.clearAction}>AC</button>
                    <button className="col-3 calc-button btn btn-primary" id='divide' name='/' onClick={this.appendDisplay}>    &divide;  </button>
                    <button className="col-3 calc-button btn btn-primary" id='multiply' name='*' onClick={this.appendDisplay}>  &times;</button>
                </div>
                <div id="second-row" className="row calc-row-button">
                    <button className="col-3 calc-button btn btn-secondary" id='seven' name='7' onClick={this.appendDisplay}>   7</button>
                    <button className="col-3 calc-button btn btn-secondary" id='eight' name='8' onClick={this.appendDisplay}>   8</button>
                    <button className="col-3 calc-button btn btn-secondary" id='nine' name='9' onClick={this.appendDisplay}>    9</button>
                    <button className="col-3 calc-button btn btn-primary" id='subtract' name='-' onClick={this.appendDisplay}>  -</button>
                </div>
                <div id="thir-row" className="row calc-row-button">
                    <button className="col-3 calc-button btn btn-secondary" id='four' name='4' onClick={this.appendDisplay}>    4</button>
                    <button className="col-3 calc-button btn btn-secondary" id='five' name='5' onClick={this.appendDisplay}>    5</button>
                    <button className="col-3 calc-button btn btn-secondary" id='six' name='6' onClick={this.appendDisplay}>     6</button>
                    <button className="col-3 calc-button btn btn-primary" id='add' name='+' onClick={this.appendDisplay}>       +</button>
                </div>
                <div id="fourth-fifth-row" className='row'>
                    <div id="ff-row-left" className='col-9'>
                        <div id="fourth-row" className="row calc-row-button">
                            <button className="col-4 calc-button btn btn-secondary" id='one' name='1' onClick={this.appendDisplay}>     1</button>
                            <button className="col-4 calc-button btn btn-secondary" id='two' name='2' onClick={this.appendDisplay}>     2</button>
                            <button className="col-4 calc-button btn btn-secondary" id='three' name='3' onClick={this.appendDisplay}>   3</button>
                        </div>
                        <div id="fifth-row" className="row calc-row-button">
                            <button className="col-8 calc-button btn btn-secondary" name='0' id='zero' name='0' onClick={this.appendDisplay}>0</button>
                            <button className="col-4 calc-button btn btn-secondary" id='decimal' name='.' onClick={this.appendDisplay}>.</button>
                        </div>
                    </div>
                    <div id="ff-row-right" className='col-3 row m-0 p-0'>
                        <button className="col calc-button btn btn-success" id='equals' onClick={this.props.calcAction}>= </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return { 
        curNumber: state.display.curNumber, 
        fullDisplay: state.display.fullDisplay
    };
}
const mapDispatchToProps = function (dispatch) {
    return {
        appendAction: function (str) {
            dispatch(rdx.appendAction(str))
        },
        clearAction: function(){
            dispatch(rdx.clearAction())
        }, 
        calcAction: function(){
            dispatch(rdx.calcAction())
        }
    };
}
const CalcC = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Calc);
const Provider = ReactRedux.Provider;

class CalcWrapper extends React.Component {
    render() {
        return (
            <Provider store={rdx.store}>
                <CalcC />
            </Provider>
        );
    }
}

ReactDOM.render(<CalcWrapper />, document.getElementById('div-main')); 