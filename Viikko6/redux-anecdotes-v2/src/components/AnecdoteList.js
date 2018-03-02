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
    const anecdotes = this.props.anecdotes
    const anecdotesToShow = this.props.filter === '' ? 
    anecdotes : anecdotes.filter(a => a.content.includes(this.props.filter))

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
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