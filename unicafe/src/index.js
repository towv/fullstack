import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.otsikko}</h1>
        </div>
    )
}

const Positiivisia = (props) => {
    const kaikki = props.tila.good + props.tila.neutral + props.tila.bad
    let pos = 0
    if (kaikki > 0) {
        pos = parseFloat(props.tila.good / kaikki * 100).toFixed(1)
    }

    return (
        <div>
            <p>positiivisia {pos} %</p>
        </div>
    )
}

const Keskiarvo = (props) => {
    const kaikki = props.tila.good + props.tila.neutral + props.tila.bad
    let ka = props.tila.good - props.tila.bad
    if (kaikki > 0) {
        ka = parseFloat(ka / kaikki).toFixed(1)
    }
    return (
        <div>
            <p>keskiarvo {ka}</p>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0
        }
    }

    clickGood = () => {
        this.setState({
            good: this.state.good + 1
        })
    }

    clickNeutral = () => {
        this.setState({
            neutral: this.state.neutral + 1
        })
    }

    clickBad = () => {
        this.setState({
            bad: this.state.bad + 1
        })
    }

    render() {
        const otsikko1 = 'anna palautetta'
        const otsikko2 = 'statistiikka'
        return (
            <div>
                <div>
                    <Otsikko otsikko={otsikko1} />
                    <button onClick={this.clickGood}>hyvä</button>
                    <button onClick={this.clickNeutral}>neutraali</button>
                    <button onClick={this.clickBad}>huono</button>
                    <Otsikko otsikko={otsikko2} />
                    <p>hyvä {this.state.good}</p>
                    <p>neutraali {this.state.neutral}</p>
                    <p>huono {this.state.bad}</p>
                    <Keskiarvo tila={this.state} />
                    <Positiivisia tila={this.state} />
                </div>
            </div>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
