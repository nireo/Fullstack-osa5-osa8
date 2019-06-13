import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from "./services/anecdote"

const combined = combineReducers({
  anecdotes: reducer,
  notifications: notificationReducer,
  filter: filterReducer
})

const store = createStore(combined)

anecdoteService.getAll().then(anecdotes => {
  store.dispatch(initializeAnecdotes(anecdotes))
}) 

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}
// <App store={store} />,

render()
store.subscribe(render)