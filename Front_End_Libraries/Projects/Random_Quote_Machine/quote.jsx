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
        var statusSpin = this.props.status ? (<i class="fas fa-spinner fa-sm fa-spin" />) : null;

        return (
            <div className='w-100 h-100 container'>
                <div class='row border-bottom p-2' id="author"><h2>
                    <a href={wikipagehref} target='_blank'> {this.props.quotes.author}</a>
                </h2></div>
                <div class='row border-bottom p-2 overflow-auto lead' id="text">{this.props.quotes.quote}</div>
                <div class='row align-self-end' id='buttons'>
                    <div className="col"></div>
                    <div className="align-self-center"> {statusSpin} {this.props.status} </div>
                    <div id="div-new-quote" class='d-flex align-items-center mr-2'>
                        <button id="new-quote" onClick={this.props.newQuote} className='btn btn-primary'>New Quote</button>
                    </div>
                    <div id="div-tweet-quote" class='d-flex align-items-center mr-2'>
                        <a id="tweet-quote" href={tweethref} target='_blank' class='btn btn-primary'>
                            <i class="fab fa-twitter"></i> Tweet
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        status: state.status,
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

