import React from 'react';
import NewAnecdote from "./components/NewAnecdote"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import Filter from "./components/Filter"

const App = ({store}) => {
  return (
    <div>
      <Notification store={store}/>
      <AnecdoteList store={store} />
      <NewAnecdote store={store}/>
      <Filter store={store} />
    </div>
  )
}

export default App