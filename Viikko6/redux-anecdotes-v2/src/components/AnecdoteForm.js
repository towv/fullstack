import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationAdded, notificationReset } from '../reducers/notificationReducer';
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value

    console.log(anecdoteCreation)
    console.log(this.props.anecdoteCreation)

    this.props.anecdoteCreation(content)
    this.props.notificationAdded(content)

    e.target.anecdote.value = ''
    setTimeout(() => {
      this.props.notificationReset()
    }, 5000)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteCreation, notificationAdded, notificationReset }
)(AnecdoteForm)