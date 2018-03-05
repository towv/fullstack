import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { Header, Grid } from 'semantic-ui-react'

const notificationStyle = {
  color: 'green',
  fontStyle: 'italic',
  fontSize: 16,
  borderColor: 'green',
  borderStyle: 'solid',
  borderRadius: 25,
  padding: 2,
  margin: 2
}

const Notification = ({ notification }) => {
  if (notification === '') {
    return null
  }
  return (
    <div style={notificationStyle}>
      <p>{notification}</p>
    </div>
  )
}
const activeStyle = {
  backgroundColor: 'pink',
  width: 4,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  height: '105%'
}

const Menu = ({ anecdotes, addNew, anecdoteById }) => (
  <div>
    <NavLink activeStyle={activeStyle} exact to="/">anecdotes</NavLink> &nbsp;
        <NavLink activeStyle={activeStyle} to="/about">about</NavLink> &nbsp;
        <NavLink activeStyle={activeStyle} to="/create">create new</NavLink>
  </div>
)

const ShowOne = ({ anecdote }) => {
  return (
    <div>
      <Header color='orange'>{anecdote.content} by {anecdote.author}</Header>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Header color='orange'>Anecdotes</Header>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote =>
          <tr key={anecdote.id} >
            <td><NavLink to={`/anecdotes/${anecdote.id}`}>
              {anecdote.content}
            </NavLink>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

const About = () => (

  <div>
    <Grid>
      <Grid.Row divided='true'>
        <Header color='orange'>About anecdote app</Header>
      </Grid.Row>
      <Grid.Row divided='true' centered='true'>
        <p>According to Wikipedia:</p>
        <Grid.Column floated='left' width='4' height='2'>
          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column floated='right' width='8'>
          <img alt='arto' src="https://tuhat.helsinki.fi/portal/files/24377592/arto.jpg" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>


)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.setState({
      content: '',
      author: '',
      info: '',
      redirect: true
    })
  }

  render() {
    return (
      <div>
        {this.state.redirect ?
          <Redirect to='/' />
          :
          <div>
            <Header color='orange'>create a new anecdote</Header>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <div>
                  <ControlLabel>content</ControlLabel>
                  <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
                </div>
                <div>
                  <ControlLabel>author</ControlLabel>
                  <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
                </div>
                <div>
                  <ControlLabel>url for more info</ControlLabel>
                  <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
                </div>
                <br></br>
                <Button bsStyle="success" type="submit">create</Button>
              </FormGroup>
            </form>
          </div>
        }
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} has been created! `
    })
    setTimeout(() => {
      this.setState({
        notification: ''
      })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className="container">
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            <Menu anecdotes={this.state.anecdotes}
              addNew={this.addNew}
              anecdoteById={this.anecdoteById} />
            <Notification notification={this.state.notification} />
            <div>
              <br />
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route exact path="/anecdotes/:id" render={({ match }) =>
                <ShowOne anecdote={this.anecdoteById(match.params.id)} />} />
              <Route path="/about" render={() => <About />} />
              <Route path="/create" render={() => <CreateNew addNew={this.addNew} />} />
            </div>
          </div>
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App;
