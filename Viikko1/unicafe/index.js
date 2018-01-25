import React from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
    const state = props.state
    return (
        <table>
            <tbody>
                <Statistic text={"hyvä"} value={state.good} />
                <Statistic text={"neutraali"} value={state.neutral} />
                <Statistic text={"huono"} value={state.bad} />
                <Statistic text={"keskiarvo"} value={Keskiarvo(state)} />
                <Statistic text={"positiivisia"} value={Positiivisia(state)} />
            </tbody>
        </table>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.otsikko}</h1>
        </div>
    )
}

const Positiivisia = (props) => {
    const kaikki = props.good + props.neutral + props.bad
    let pos = 0
    if (kaikki > 0) {
        pos = parseFloat(props.good / kaikki * 100).toFixed(1)
    }
    const string = pos + " %"

    return (
        string
    )
}

const Keskiarvo = (props) => {
    const kaikki = props.good + props.neutral + props.bad
    let ka = props.good - props.bad
    if (kaikki > 0) {
        ka = parseFloat(ka / kaikki).toFixed(1)
    }
    return (
        ka
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

    click = (props) => {
        const taulu = ['good', 'neutral', 'bad']
        return () => {
            this.setState({ [taulu[props]]: this.state[taulu[props]] + 1 })
        }
    }

    render() {
        const otsikko1 = 'anna palautetta'
        const otsikko2 = 'statistiikka'
        const state = ["hyvä", "neutraali", "huono"]

        const Nappi = (props) => {
            return (
                <button onClick={this.click(props.fiilis)}>{state[props.fiilis]}</button>
            )
        }

        if (this.state.good + this.state.neutral + this.state.bad === 0) {
            return (
                <div>
                    <Otsikko otsikko={otsikko1} />
                    <Nappi fiilis={0} />
                    <Nappi fiilis={1} />
                    <Nappi fiilis={2} />
                    <Otsikko otsikko={otsikko2} />
                    <p>ei yhtään palautetta annettu</p>
                </div>
            )
        } else {
            return (
                <div>
                    <Otsikko otsikko={otsikko1} />
                    <Nappi fiilis={0} />
                    <Nappi fiilis={1} />
                    <Nappi fiilis={2} />
                    <Otsikko otsikko={otsikko2} />
                    <Statistics state={this.state} />
                </div>
            )
        }
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
