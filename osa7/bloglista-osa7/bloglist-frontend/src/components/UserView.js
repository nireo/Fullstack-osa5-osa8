import React from "react"
import { connect } from "react-redux"

const UserView = (props) => {
    if (props.user === undefined) {
        return null
    }

    return (
        <div>
            <h3>{props.user.name}</h3>
            <h5>Blogs:</h5>
            <ul>
                {props.user.blogs.map(blog => 
                    <li>{blog.title}</li>    
                )}
            </ul>
        </div>
    )
}

export default connect(null, null)(UserView)