import React from 'react'
import { connect } from "react-redux"
import { Button, ButtonGroup, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useField } from "../hooks/index"
import { handleComment } from "../reducers/blogReducer"

const BlogView = (props) => {
    const comment = useField('text')
    if (props.blog === undefined) {
        return null
    }
    const allComments = props.blog.comments.map(comment => <li>{comment}</li>)
    const padding = {
        padding: '10px'
    }

    console.log("hello")

    const addComment = () => {
        props.handleComment(props.blog, comment.value)
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
            <Form onSubmit={props.handleComment(props.blog, comment.value)}>
                <Form.Label>Comment:</Form.Label>
                <Form.Control 
                    {...comment}
                />
                <Button onClick={() => props.handleComment(props.blog, comment.value)}variant="primary">add comment</Button>
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