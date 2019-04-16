class Drum extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: ' '
        };

        this.thePlayKeyHandle = this.thePlayKeyHandle.bind(this);
        this.thePlay = this.thePlay.bind(this);
        this.keypressHandle = this.keypressHandle.bind(this);
    }

    thePlayKeyHandle(str) {
        document.getElementById(str).play();
        this.setState({
            display: str
        });
    }
    thePlay(event) { this.thePlayKeyHandle(event.target.innerText); }
    keypressHandle() {
        if ('qweasdzxcQWEASDZXC'.includes(event.key)) {
            this.thePlayKeyHandle(event.key.toUpperCase());
            // document.getElementById(event.key.toUpperCase()).parentElement.click(); 
        }
    }
    componentDidMount() {
        window.addEventListener('keydown', this.keypressHandle);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.keypressHandle);
    }

    render() {
        return (
            <div id="drum-machine" class='container'>
                <div id="display" class='border'>{this.state.display}</div>
                <div id="drum-pads" class='container'>
                    <div className="row">
                        <button className="drum-pad col-4 btn btn-primary" id="drum1" onClick={this.thePlay}>
                            <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' class='clip' id='Q' /> Q
                        </button>
                        <button className="drum-pad col-4 btn btn-primary" id="drum2" onClick={this.thePlay}>
                            <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' class='clip' id='W' /> W
                        </button>
                        <button className="drum-pad col-4 btn btn-primary" id="drum3" onClick={this.thePlay}>
                            <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' class='clip' id='E' /> E
                        </button>
                    </div>
                    <div className="row">
                        <button className="drum-pad col-4 btn btn-primary" id="drum4" onClick={this.thePlay}>
                            <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' class='clip' id='A' /> A
                        </button>
                        <button className="drum-pad col-4 btn btn-primary" id="drum5" onClick={this.thePlay}>
                            <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' class='clip' id='S' /> S
                        </button>
                        <button className="drum-pad col-4 btn btn-primary" id="drum6" onClick={this.thePlay}>
                            <audio src='https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' class='clip' id='D' /> D
                        </button>
                    </div>
                    <div className="row">
                        <button className="drum-pad col-4 btn btn-primary" id="drum7" onClick={this.thePlay}>
                            <audio src='https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' class='clip' id='Z' /> Z
                        </button>
                        <button className="drum-pad col-4 btn btn-primary" id="drum8" onClick={this.thePlay}>
                            <audio src='https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' class='clip' id='X' /> X
                        </button>
                        <button className="drum-pad col-4 btn btn-primary" id="drum9" onClick={this.thePlay}>
                            <audio src='https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' class='clip' id='C' /> C
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Drum />, document.getElementById('div-main')); 