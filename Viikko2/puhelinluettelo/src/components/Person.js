import React from 'react';

const Person = ({ persons, deletePerson }) => {
    return (
        <table>
            <tbody>

                {persons.map(person =>
                    <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                        <td>
                            {/* <form onSubmit={deletePerson(person.id)}> */}
                                <button onClick={() => {deletePerson(person.id, person.name)}}>poista</button>
                            {/* </form> */}
                        </td>
                    </tr>)}
            </tbody>
        </table>
    )
}

export default Person