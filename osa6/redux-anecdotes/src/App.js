import React from 'react';
import NewAnecdote from "./components/NewAnecdote"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import Filter from "./components/Filter"

const App = ({store}) => {
  return (
    <div>
      <Notification />
      <AnecdoteList  />
      <NewAnecdote />
      <Filter />
    </div>
  )
}

export default App