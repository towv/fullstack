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
                {/* <Keskiarvo tila={state} />
            <Positiivisia tila={state} /> */}
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
        // <div>
        //     <p>keskiarvo {ka}</p>
        // </div>
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

    click = (props) => {
        const taulu = ['good', 'neutral', 'bad']
        return () => {
            this.setState({ [taulu[props]]: this.state[taulu[props]] + 1 })
        }
        // const nykyarvo = this.state[props.tila]
        // if (props === 0) {
        //     return () => {
        //         this.setState({
        //             good: this.state.good + 1
        //         })
        //     }
        // }
        // if (props == 1) {
        //     return () => {
        //         this.setState({
        //             neutral: this.state.neutral + 1
        //         })
        //     }
        // }
        // if (props == 2) {
        //     return () => {
        //         this.setState({
        //             bad: this.state.bad + 1
        //         })
        //     }
        // }

        // this.state[props.tila] = nykyarvo + 1
    }

    render() {
        const otsikko1 = 'anna palautetta'
        const otsikko2 = 'statistiikka'
        const state = ["hyvä", "neutraali", "huono"]
        const kolme = 3


        const Nappi = (props) => {
            return (
                <button onClick={this.click(props.fiilis)}>{state[props.fiilis]}</button>
            )
        }

        // const Button = (props) => {
        //     if (props.onclick === "hyvä") {
        //         return (
        //             <button onClick={this.clickGood}>hyvä</button>
        //         )
        //     }
        //     if (props.onclick === "neutraali") {
        //         return (
        //             <button onClick={this.clickNeutral}>neutraali</button>
        //         )
        //     }
        //     if (props.onclick === "huono") {
        //         return (
        //             <button onClick={this.clickBad}>huono</button>
        //         )
        //     }

        // }
        if (this.state.good + this.state.neutral + this.state.bad === 0) {
            return (
                <div>
                    <Otsikko otsikko={otsikko1} />
                    <Nappi fiilis={0} />
                    <Nappi fiilis={1} />
                    <Nappi fiilis={2} />
                    {/* <Button onclick={state[0]} />
                    <Button onclick={state[1]} />
                    <Button onclick={state[2]} /> */}
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
                    {/* <Button onclick={state[0]} />
                    <Button onclick={state[1]} />
                    <Button onclick={state[2]} /> */}
                    <Otsikko otsikko={otsikko2} />
                    <Statistics state={this.state} />
                </div>
            )
        }
        // return (

        //     <div>
        //         <Otsikko otsikko={otsikko1} />
        //         <Button onclick={state[0]} />
        //         <Button onclick={state[1]} />
        //         <Button onclick={state[2]} />
        //         {/* <button onClick={this.clickGood}>hyvä</button>
        //             <button onClick={this.clickNeutral}>neutraali</button>
        //             <button onClick={this.clickBad}>huono</button> */}
        //         <Otsikko otsikko={otsikko2} />

        //         if (this.state.good + this.state.neutral + this.state.bad === 0) {
        //             <p>ei yhtään palautetta annettu</p>
        //         } else {
        //             <Statistics state={this.state} />
        //         }

        //         {/* <p>hyvä {this.state.good}</p>
        //             <p>neutraali {this.state.neutral}</p>
        //             <p>huono {this.state.bad}</p>
        //             <Keskiarvo tila={this.state} />
        //             <Positiivisia tila={this.state} /> */}
        //     </div>
        // )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
