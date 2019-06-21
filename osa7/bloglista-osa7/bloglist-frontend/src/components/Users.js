import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from "react-bootstrap"

const Users = (props) => {
    const byBlogs = (b1, b2) => b2.blogs.length - b1.blogs.length
    const sortedUsers = props.allUsers.sort(byBlogs)


    const userList = sortedUsers.map(
        user => <tr key={user.name}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
        </tr>
    )
    
    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <tbody>
                    <tr>    
                        <th>Name</th>
                        <th>Blogs Created:</th>
                    </tr>
                    {userList}
                </tbody>    
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.allUsers
    }
}

export default connect(mapStateToProps, null)(Users)