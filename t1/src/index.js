import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    const osat = props.osat
    const m1 = osat.map((osa) => osa.nimi + ' ' + osa.tehtavia)

    const[osa1, osa2, osa3] = m1
    return (
        <div>
            {/* <Osa osa={props.osa} tehtavia={props.tehtavia} /> */}
            <Osa osa={osa1}/>
            <Osa osa={osa2}/>
            <Osa osa={osa3}/>
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.osa}</p>
        </div>
    )
}

const Yhteensa = (props) => {
    let summa = 0
    const[osa1, osa2, osa3] = props.osat
    summa += osa1.tehtavia
    summa += osa2.tehtavia
    summa += osa3.tehtavia
    return (
        <div>
            <p>Yhteensä {summa} tehtävää</p>
        </div>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10
        },
        {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
        },
        {
            nimi: 'Komponenttien tila',
            tehtavia: 14
        }
    ]


    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osat={osat} />
            <Yhteensa osat={osat} />
        </div>
    )
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
