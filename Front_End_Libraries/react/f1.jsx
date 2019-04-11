class MyComponentWithState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'LOL',
            nb: 0
        };
        this.inc = this.inc.bind(this);
        this.dec = this.dec.bind(this);
        this.res = this.res.bind(this);
    }

    inc(){ this.setState({ nb: this.state.nb + 1 }); }
    dec(){ this.setState({ nb: this.state.nb - 1 }); }
    res(){ this.setState({ nb: 0 }); }

    render() {
        return (
            <div>
                <h2>My Name is {this.state.name}</h2>
                <button onClick={this.inc}>Increment</button>
                <button onClick={this.dec}>Decrement</button>
                <button onClick={this.res}>Reset</button>
                <h3>The number is {this.state.nb} </h3>
            </div>
        );
    }
}

class TextIO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            sub: ''
        };
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({
            sub: this.state.value
        });
    }

    componentWillMount(){
        console.log('before TextIO mount')
    }


    render() {
        var toolong = ''; 
        var cls = ''; 
        if (this.state.value.length > 5){
            toolong = (
                <div style={{'color': 'red'}}>
                    Your input is too long ({this.state.value.length}), but it doesn't matter :)
                </div>
            ); 
            cls = ' is-invalid'; 
        }

        return (
            <div>
                {toolong}
                <form onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <div className="col-3"> <label>Your input:</label> </div>
                        <div className="col-6">
                            <input type="text" onChange={this.handleChange} className={'form-control'+cls} />
                        </div>
                        <div className="col-3">
                            <button type="submit" className='btn btn-primary'>Submit</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-3"> Real-time output: </div>
                        <div className="col-9"> {this.state.value} </div>
                    </div>
                    <div className="row">
                        <div className="col-3">Last output:</div>
                        <div className="col-9">{this.state.sub}</div>
                    </div>
                </form>
            </div>
        );
    }
}

class CurTime extends React.Component {
    constructor(props){ 
        super(props); 
        this.state = {
            timeVal: Date()
        }
    }

    componentDidMount(){
        // console.log('CurTime componentDidMount triggered')
        this.componentDidUpdate()
    }
    componentDidUpdate(){
        // console.log('CurTime componentDidUpdate triggered')
        setTimeout(()=>{
            this.setState({
                timeVal: Date()
            }); 
        }, 1000); 
    }

    render(){
        return (
            <div className="lead">Current time is: {this.state.timeVal}</div>
        ); 
    }
}

class KeyCodePressed extends React.Component {
    constructor(props){
        super(props); 
        this.state = ({kc: 0}); 

        // this.handleKeyPress = this.handleKeyPress.bind(this); 
    }

    componentDidMount(){
        addEventListener('keypress', this.handleKeyPress); 
    }
    componentWillUnmount(){
        removeEventListener('keypress', this.handleKeyPress); 
    }

    //handleKeyPress(event){ 
    handleKeyPress = (event)=>{ 
        this.setState({
            kc: event.keyCode
        }); 
    }

    render(){
        return(
            <div className="lead">The keycode you pressed was: {this.state.kc}</div>
        );
    }

}

ReactDOM.render(<MyComponentWithState />, document.getElementById('component-with-state'));
ReactDOM.render(<TextIO />, document.getElementById('io'));
ReactDOM.render(<CurTime />, document.getElementById('cur-time'));
ReactDOM.render(<KeyCodePressed />, document.getElementById('key-code-pressed')); 