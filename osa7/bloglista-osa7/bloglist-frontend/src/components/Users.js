import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
    const userList = props.allUsers.map(
        user => <tr>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
        </tr>
    )
    
    return (
        <div>
            <h2>Users</h2>
            <table>
                <tr>    
                    <th>Name</th>
                    <th>Blogs Created:</th>
                </tr>
                {userList}
            </table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.allUsers
    }
}

export default connect(mapStateToProps, null)(Users)