import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const old = store.filter(a => a.id !== action.id)
      const voted = store.find(a => a.id === action.id)

      return [...old, { ...voted, votes: voted.votes }]

    case 'CREATE':
      return [...store, action.newAnecdote]

    case 'INIT_ANECDOTES':
      return action.anecdotes

    default:
      return store
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export const anecdoteCreation = (data) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'CREATE',
      newAnecdote
    })
  }
}

export const voteCreation = (anecdote) => {
  return async (dispatch) => {
    anecdote.votes = anecdote.votes + 1
    const votedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      id: votedAnecdote.id
    })
  }
}

export default anecdoteReducer