import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationAdded, notificationReset } from '../reducers/notificationReducer';
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(anecdoteCreation(content))
    this.props.store.dispatch(notificationAdded(content))

    e.target.anecdote.value = ''
    setTimeout(() => {
      this.props.store.dispatch(notificationReset())
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.notes,
    filter: state.filter
  }
}

const ConnectedAnecdoteForm = connect(mapStateToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm