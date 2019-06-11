import React from 'react';
import NewAnecdote from "./components/NewAnecdote"

const App = (props) => {
  const anecdotes = props.store.getState()
  
  const vote = (id) => {
    console.log('vote', id)
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <NewAnecdote store={props.store}/>
    </div>
  )
}

export default App