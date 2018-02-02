import React from 'react';
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      newFilter: '',
      message: null
    }
  }

  componentDidMount() {
    console.log('will mount')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response })
      })
  }

  addPerson = (event) => {
    console.log('alku')
    console.log(this.state.newName)
    console.log(this.state.newNumber)
    console.log('alkuloppu')
    console.log('nappia painettu')
    event.preventDefault()

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    let exists = function (param) {
      return param.name.toLowerCase() === personObject.name.toLowerCase()
    }
    if (this.state.persons.some(exists)) {
      console.log('metodi löytyykö toimii')
      alert('Tämän niminen henkilö on jo luettelossa')
      if (window.confirm(this.state.newName + " on jo luettelossa, korvataanko numero uudella?")) {
        const p = this.state.persons.find(function (person) {
          return person.name.toLowerCase() === personObject.name.toLowerCase()
        })
        personService
          .update(p.id, p)
          .then(modifiedPerson => {
            const persons = this.state.persons.filter(person => person.id !== modifiedPerson.id)
            this.setState({
              persons: persons.concat(modifiedPerson),
              newName: '',
              newNumber: '',
              newFilter: ''
            })
          })
          .catch(error => {
            console.log(this.state.persons)
            console.log(this.state.persons.filter(per => per.id !== p.id))
            console.log(this.state.newName)
            console.log(this.state.newNumber)
            this.setState({
              message: `henkilö '${p.name}' oli poistettu palvelimelta, mutta on nyt lisätty uudella numerolla`,
              persons: this.state.persons.filter(per => per.id !== p.id)
            })
            setTimeout(() => {
              this.setState({ message: null })
            }, 2000)
            return this.letsReallyAddAnewPerson(personObject)
          })

        this.setState({
          message: `henkilön '${p.name}' numero on muutettu`,
        })
        setTimeout(() => {
          this.setState({ message: null })
        }, 2000)
      }
      return null
    }
    // const persons = this.state.persons.concat(personObject)

    return this.letsReallyAddAnewPerson(personObject)

    // this.setState({
    //   persons: persons,
    //   newName: '',
    //   newNumber: '',
    //   newFilter: ''
    // })
  }

  letsReallyAddAnewPerson = (personObject) => {
    personService
      .create(personObject)
      .then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newName: '',
          newNumber: '',
          newFilter: '',
        })
      })
    this.setState({
      message: `henkilö '${personObject.name}' on lisätty`,
    })
    setTimeout(() => {
      this.setState({ message: null })
    }, 2000)
  }

  deletePerson = (id, name) => {
    if (window.confirm("poistetaanko " + name)) {
      personService
        .destroy(id)
        .then(response => {
          console.log('delete fulfilled')
          this.setState({ persons: this.state.persons.filter(person => person.id !== id) })
        })
      this.setState({
        message: `henkilö '${name}' on poistettu`,
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 2000)
    }
  }

  handleNameEvent = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleNumberEvent = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  handleFilterEvent = (event) => {
    console.log(event.target.value)
    this.setState({ newFilter: event.target.value })
  }

  render() {
    const personsToShow =
      this.state.newFilter.length === 0 ?
        this.state.persons :
        this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.newFilter.toLowerCase()))


    return (
      <div>

        <h2>Puhelinluettelo</h2>

        <Notification message={this.state.message} />

        <div>
          rajaa näytettäviä: <input
            value={this.state.newFilter}
            onChange={this.handleFilterEvent} />
        </div>


        <h3>Lisää uusi</h3>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameEvent} />
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberEvent} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>

        <h3>Numerot</h3>
        <Person persons={personsToShow} deletePerson={this.deletePerson} />
      </div>
    )
  }
}

export default App