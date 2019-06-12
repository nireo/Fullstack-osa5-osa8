import React from 'react';
import NewAnecdote from "./components/NewAnecdote"
import AnecdoteList from "./components/AnecdoteList"

const App = ({store}) => {
  return (
    <div>
      <AnecdoteList store={store} />
      <NewAnecdote store={store}/>
    </div>
  )
}

export default App