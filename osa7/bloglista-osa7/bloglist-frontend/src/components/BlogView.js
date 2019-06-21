import React, { useState } from 'react'
import { connect } from "react-redux"
import { Button, ButtonGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

const BlogView = (props) => {
    if (props.blog === undefined) {
        return null
    }

    const padding = {
        padding: '10px'
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
            <Link style={padding} to="/">Go back</Link>
        </div>
    )
}

export default connect(null, null)(BlogView)