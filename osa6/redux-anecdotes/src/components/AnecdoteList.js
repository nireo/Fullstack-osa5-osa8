import React from "react"
import { connect } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdotes = (props) => {
    const notification = content => {
        props.setNotification(content)
        setTimeout(() => {
            props.setNotification(null)
        }, 5000)
    } 

    return ( 
    <div>
    <h1>Anecdotes</h1>
    {props.visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={() => {
                props.addVote(anecdote.id)
                notification(anecdote.content)
            }}>vote</button>
        </div>
        </div>
        )}
    </div>
    )
}

const toShow = ({anecdotes, filter}) => {
    const sortedAnecdotes = anecdotes.sort((a, b) => (a.votes < b.votes) ? 1 : -1)
    if (filter === '') {
        return sortedAnecdotes
    }
    return filter ? sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())) : sortedAnecdotes
}

const mapStateToProps = (state) => {
    return {
      visibleAnecdotes: toShow(state)
    }
}

const mapDispatchToProps = {
    addVote,
    setNotification
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Anecdotes)