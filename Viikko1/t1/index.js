import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    const kurssi = props.kurssi
    return (
        <div>
            <h1>{kurssi.nimi}</h1>
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
    // props.osat.forEach((osa) => {
    //     summa += osa.tehtavia
    // })
    return (
        <div>
            <p>Yhteensä {summa} tehtävää</p>
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
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
      }


    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
