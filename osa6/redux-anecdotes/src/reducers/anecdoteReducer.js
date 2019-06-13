const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANEC':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD_VOTE':
      const id = action.data.id
      const toBeVoted = state.find(
        a => a.id === id
      )
      const voted = {
        ...toBeVoted, votes: toBeVoted.votes + 1
      }
      return state.map(
        anecdote => anecdote.id !== id ? anecdote : voted
      )
    default:
      return state
  }
}

export const addVote = id => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export const createAnecdote = data => {
  return {
    type: 'NEW_ANEC',
    data,
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default reducer