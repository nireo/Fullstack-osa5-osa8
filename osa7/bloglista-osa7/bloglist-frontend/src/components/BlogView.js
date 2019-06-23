import React from 'react'
import { connect } from "react-redux"
import { Button, ButtonGroup, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useField } from "../hooks/index"
import { initializeBlogs } from "../reducers/blogReducer"
import blogService from "../services/blogs"

const BlogView = (props) => {
    const comment = useField('text')
    if (props.blog === undefined) {
        return null
    }
    const allComments = props.blog.comments.map(comment => <li key={comment}>{comment}</li>)
    const padding = {
        padding: '10px'
    }

    const addComment = async () => {
        console.log("clicked")
        await blogService.addComment({blog: props.blog, comment: comment.value})
        props.initializeBlogs()
        comment.reset()
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
                <Form.Group>
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control 
                        type={comment.type}
                        value={comment.value}
                        onChange={comment.onChange}
                    />
                    <Button variant="primary" type="submit">add comment</Button>
                </Form.Group>
            </Form>
            <ul>
                {allComments}
            </ul>
            <Link style={padding} to="/">Go back</Link>
        </div>
    )
}

const mapDispatchToProps = {
    initializeBlogs
}

export default connect(null, mapDispatchToProps)(BlogView)