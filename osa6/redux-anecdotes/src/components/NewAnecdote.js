import React from "react"
import { createAnecdote } from "../reducers/anecdoteReducer"

const NewAnecdote = ({store}) => {
    const addAnecdote = event => {
        event.preventDefault()
        store.dispatch(
            createAnecdote(event.target.anecdote.value)
        )
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">lisää</button>
            </form>
        </div>
    )
}

export default NewAnecdote