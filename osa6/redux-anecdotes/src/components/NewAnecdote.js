import React from "react"
import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import anecdoteService from "../services/anecdote"

const NewAnecdote = (props) => {
    const addAnecdote = async event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        props.createAnecdote(newAnecdote)
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

export default connect(
    null,
    { createAnecdote }
)(NewAnecdote)