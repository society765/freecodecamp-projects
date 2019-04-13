import { store, addMessage, resetMessage } from './rdx.js';

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.resetMessage = this.resetMessage.bind(this); 
  }

  // add handleChange() and submitMessage() methods here
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  submitMessage(event) {
    event.preventDefault();
    this.props.addNewMessage(this.state.input);
    this.setState({
      input: ''
    });
  }

  resetMessage(){ this.props.resetMessage(); }

  render() {
    var msga = [...this.props.messages]; 
    var lic = msga.map((x, i) => <li key={i}>{x}</li>);
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <div className="row">
          <div className="col">
            <input type='text' onChange={this.handleChange} value={this.state.input} className='form-control' />
          </div>
          <div className="col-3">
            <button onClick={this.submitMessage} className='btn btn-primary btn-block'>Add</button>
          </div>
          <div className="col-3">
            <button onClick={this.resetMessage} className='btn btn-primary btn-block'>Reset</button>
          </div>
        </div>
        <div>
          <ul>{lic}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (state) { return { messages: state.message }; }
const mapDispatchToProps = function (dispatch) {
  return {
    addNewMessage: function (mes) {
      dispatch(addMessage(mes))
    }, 
    resetMessage: function (){ 
      dispatch(resetMessage()); 
    }
  };
}
const connect = ReactRedux.connect;
const DisplayMessagesC = connect(mapStateToProps, mapDispatchToProps)(DisplayMessages);

const Provider = ReactRedux.Provider;
class DisplayMessagesWrapper extends React.Component {
  // render the Provider here
  render() {
    return (
      <Provider store={store}>
        <DisplayMessagesC />
      </Provider>
    )
  };
  // change code above this line
};

ReactDOM.render(<DisplayMessagesWrapper />, document.getElementById('display-message')); 