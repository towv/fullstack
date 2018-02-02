import React from 'react';
import countryService from './services/countries'

const Country = ({ countries, handler }) => {

  if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name} {country.nativeName}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <img src={country.flag} alt='no flag to show' height="60" />
      </div>
    )
  }

  if (countries.length > 10) {
    return 'too many matches, specify another filter'
  }
  console.log(countries[0])
  return (
    countries.map((country) => <div onClick={() => handler(country.name)} key={country.name}>{country.name}</div>)
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      newFilter: '',
      message: null
    }
  }

  componentDidMount() {
    countryService
      .getAll()
      .then(response => {
        this.setState({ countries: response })
      })
  }

  handleFilterEvent = (event) => {
    this.setState({ newFilter: event.target.value })
  }

  clickHandler = (name) => {
    this.setState({ newFilter: name })
  }

  render() {

    const countriesToShow = 
      this.state.newFilter.length === 0 ?
        this.state.countries : 
        this.state.countries.filter(function(c) {
          let filter = this.state.newFilter.toLowerCase()
          let country = c.name.toLowerCase()
          return country.includes(filter)
        }.bind(this))
    
    return (
      <div>

        <div>
          find countries: <input
            value={this.state.newFilter}
            onChange={this.handleFilterEvent} />
        </div>
        <Country countries={countriesToShow} handler={this.clickHandler} />


      </div>
    )
  }
}

export default App;
