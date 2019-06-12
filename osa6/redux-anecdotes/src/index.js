import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const combined = combineReducers({
  anecdotes: reducer,
  notifications: notificationReducer,
  filter: filterReducer
})

const store = createStore(combined)

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}
// <App store={store} />,

render()
store.subscribe(render)