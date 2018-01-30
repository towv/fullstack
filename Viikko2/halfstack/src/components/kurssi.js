import React from 'react'

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = ({ osat }) => {
    return (
        <div>
            {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
        </div>
    )
}

const Yhteensa = ({ osat }) => {
    return (
        <p>yhteensä {osat.reduce((sum, osa) => sum + osa.tehtavia, 0)} tehtävää</p>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi