import React from "react"
import { connect } from "react-redux"

const UserView = (props) => {
    return (
        <div>
            <h3>{props.user.name}</h3>
            <ul>
                {props.user.blogs.map(blog => 
                    <li>{blog.title}</li>    
                )}
            </ul>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        user: props.user,
    }
}

export default connect(mapStateToProps, null)(UserView)