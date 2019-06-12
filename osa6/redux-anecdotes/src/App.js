import React from 'react';
import NewAnecdote from "./components/NewAnecdote"
import { addVote } from "./reducers/anecdoteReducer"

const App = ({store}) => {
  const anecdotes = store.getState()
  
  const vote = id => {
    console.log("id", id)
    store.dispatch(
      addVote(id)
    )
  }
  
  const sortedAnecdotes = anecdotes.sort((a, b) => (a.votes < b.votes) ? 1 : -1)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <NewAnecdote store={store}/>
    </div>
  )
}

export default App