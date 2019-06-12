import React from "react"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = ({store}) => {
    const anecdotes = store.getState().anecdotes
    const vote = id => {
        store.dispatch(
            addVote(id),
        )
    }

    const notification = content => {
        store.dispatch(
            setNotification(content)
        )
        setTimeout(() => {
            store.dispatch(
                setNotification(null)
            )
        }, 5000)
    }

    const sortedAnecdotes = anecdotes.sort((a, b) => (a.votes < b.votes) ? 1 : -1)

    return (
        <div>
            <h1>Anecdotes</h1>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => {
                        vote(anecdote.id)
                        notification(anecdote.content)
                    }}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList