import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const combined = combineReducers({
  anecdotes: reducer,
  notifications: notificationReducer
})

const store = createStore(combined)

console.log(store.getState())


const render = () => {
  ReactDOM.render(
    <div></div>,
    document.getElementById('root')
  )
}
// <App store={store} />,

render()
store.subscribe(render)