const rawElement = (
    <div class='mydiv'>
        <h1>Hello World</h1>
        <br />
        <p>Lets render this to the DOM</p>
        <div class='test' />
    </div>
);

const RawFunctionNested = () => {
    return (
        <ul>
            <li>abc1</li>
            <li>abc2</li>
            <li>abc3</li>
        </ul>
    );
}

const RawFunction = () => {
    return (
        <div>
            some text
            <RawFunctionNested />
        </div>
    );
}

class RawClass extends React.Component {
    render() {
        return <h2>Raw class</h2>;
    }
}

const rawElementTwo = (
    <h2>raw Element Two</h2>
);


class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>hello world</h1>
                <RawFunction />
                <RawClass />
                {rawElementTwo}
            </div>
        );
    }
}

const FunctionWithVariables = (props) => {
    {/* inline style for JSX */ }
    return (
        <div style={{ 'color': 'red' }}>
            Current time is: {props.date} <br />
            Array joined: {props.ar.join('+')} <br />
            Default value: {props.dfs}
        </div>
    );
}
FunctionWithVariables.defaultProps = {
    dfs: 'default-value'
}
FunctionWithVariables.propTypes = {dfs: PropTypes.string.isRequired}


ReactDOM.render(rawElement, document.getElementById('challenge-node'))
ReactDOM.render(RawFunction(), document.getElementById('stateless-function'))
ReactDOM.render(<MyComponent />, document.getElementById('component'))
ReactDOM.render(<FunctionWithVariables date={Date()} ar={['abc', 'def', 'ghi']} dfs={'default-value overridden'} />, document.getElementById('pass-variables'))



