import React, { useState } from 'react'
import { connect } from "react-redux"
import { Button, ButtonGroup, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { handleComment } from "../reducers/blogReducer"
import { useField } from "../hooks/index"

const BlogView = (props) => {
    const comment = useField('text')
    if (props.blog === undefined) {
        return null
    }
    const allComments = props.blog.comments.map(comment => <li>{comment}</li>)
    const padding = {
        padding: '10px'
    }
    console.log(props.blog.id)

    const addComment = () => {
        const commentObject = { comment: comment.value }
        props.handleComment(props.blog, commentObject)
    }

    return (
        <div>
            <h2>{props.blog.title}</h2>
            <a href={props.blog.url}>{props.blog.url}</a>
            <p>added by {props.blog.author}</p>
            <p>has {props.blog.likes} likes</p>
            <ButtonGroup>
                <Button variant="primary" onClick={() => props.handleLike(props.blog.id)}>like</Button>
                <Button variant="danger" onClick={() => props.handleRemove(props.blog.id)}>remove</Button>
            </ButtonGroup>
            <h3>Comments: </h3>
            <Form onSubmit={addComment}>
                <Form.Label>Comment:</Form.Label>
                <Form.Control 
                    {...comment}
                />
                <Button variant="primary" type="submit">add comment</Button>
            </Form>
            <ul>
                {allComments}
            </ul>
            <Link style={padding} to="/">Go back</Link>
        </div>
    )
}

const mapDispatchToProps = {
    handleComment
}

export default connect(null, mapDispatchToProps)(BlogView)