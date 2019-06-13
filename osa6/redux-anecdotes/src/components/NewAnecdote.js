import React from "react"
import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const NewAnecdote = (props) => {
    const addAnecdote = async event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
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