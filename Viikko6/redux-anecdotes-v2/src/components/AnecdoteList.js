import React from 'react'
import { voteCreation } from '../reducers/anecdoteReducer'
import { notificationVote, notificationReset } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  handleVote = (props) => {
    this.props.voteCreation(props.id)
    this.props.notificationVote(props.content)
    setTimeout(() => {
      this.props.notificationReset('')
    }, 5000)
  }

  render() {

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.handleVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  const unsorted = filter === '' ?
    anecdotes : anecdotes.filter(a => a.content.includes(filter))
  return unsorted.sort((a, b) => b.votes - a.votes)
  }

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification,
    anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  voteCreation,
  notificationVote,
  notificationReset
}

const ConnectedAnecdotelist = connect(
  mapStateToProps,
  mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdotelist