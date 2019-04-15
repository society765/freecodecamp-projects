import { store, changeAction } from './rdx.js';

class MarkdownPreviewer extends React.Component {
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
    }

    change(event) {
        var text = event.target.value;
        this.props.change(text);
    }

    componentDidMount(){
        var init = `
# Title
## Header
### Sub Header

[Github](https://github.com)

\`git clone https://github.com/this/repo.git\`

\`\`\`
int main(){
    printf("hello world\\n");
}
\`\`\`

* List item 1
* List item 2
* List item 3

> This is a very long line that will still be quoted properly when it wraps. 
> Oh boy let's keep writing to make sure this is long enough to actually wrap 
> for everyone. Oh, you can put Markdown into a blockquote.

*italics* 

**bold** 

![](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)
`; 
        document.getElementById('editor').value = init; 
        this.props.change(init); 
    }

    render() {
        return (
            <div class='row p-0 m-0' id='mdp-ret' style={{'height': '100vh', 'width': '100vw' }}>
                <div id='main-left' class='col-6 card p-0'>
                    <textarea id="editor" class='form-control w-100 h-100' onChange={this.change}></textarea>
                </div>
                <div id='main-right' class='col-6 card p-2'>
                    <div id="preview" class='w-100 h-100' dangerouslySetInnerHTML={{ __html: this.props.text }}>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = function (state) {
    return { text: state.text }
}
const mapDispatchToProps = function (dispatch) {
    return {
        change: function (text) {
            return dispatch(changeAction(text));
        }

    }
}

const MarkdownPreviewerC = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MarkdownPreviewer);
const Provider = ReactRedux.Provider;

class MarkdownPreviewerWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MarkdownPreviewerC />
            </Provider>
        );
    }
}

ReactDOM.render(<MarkdownPreviewerWrapper />, document.getElementById('div-main')); 
