import React, { useEffect } from 'react'
import { connect } from "react-redux"
import NewAnecdote from "./components/NewAnecdote"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import { initializeAnecdotes } from "./reducers/anecdoteReducer"

const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
  }, [])


  return (
    <div>
      <Notification />
      <AnecdoteList  />
      <NewAnecdote />
      <Filter />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)