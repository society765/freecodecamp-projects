import { store, getQuote } from './rdx.js';
import { fetchWiki } from './fetch_wiki.js';

// store.dispatch(fetchMessage()); 
// store.dispatch({type: 'QUOTE', quote: 'haha'})

class Quote extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var tweethref = "https://twitter.com/intent/tweet?text=" + this.props.quotes.quote;
        var wikipagehref = 'https://en.wikipedia.org/wiki/' + this.props.quotes.author; 
        return (
            <div>
                <div id="author"><a href={wikipagehref} target='_blank'>{this.props.quotes.author}</a></div>
                <div id="text">{this.props.quotes.quote}</div>
                <div id="div-new-quote">
                    <button id="new-quote" onClick={this.props.newQuote} className='btn btn-primary'>New Quote</button>
                </div>
                <div id="div-tweet-quote">
                    <a id="tweet-quote" href={tweethref} target='_blank'>Tweet!</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        quotes: state.quotes
    };
}
const mapDispatchToProps = function (dispatch) {
    return {
        newQuote: function () {
            dispatch(getQuote(fetchWiki));
        }
    };
}

const QuoteC = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Quote);
const Provider = ReactRedux.Provider;

class QuoteWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <QuoteC />
            </Provider>
        );
    }
}

ReactDOM.render(<QuoteWrapper />, document.getElementById('quote-box'));

