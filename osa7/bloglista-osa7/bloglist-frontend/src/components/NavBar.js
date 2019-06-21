import React from "react"
import { Navbar, Nav, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logOut } from "../reducers/userReducer"

const NavigationBar = (props) => {
    const linkStyle = {
        paddingRight: 5,
        textDecoration: 'none'
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                    <Link style={linkStyle} to="/">Home</Link>
                </Nav.Link>
                {(props.showLogOut &&
                    <Nav.Link>
                        <Link style={linkStyle} to="/users">Users</Link>
                    </Nav.Link>
                )}
            </Nav>
            {(props.showLogOut &&
                <Button variant="outline-primary" onClick={() => props.logOut()}>logout</Button>    
            )}
        </Navbar.Collapse>
    </Navbar>
    )
}

const mapStateToProps = (state, props) => {
    return {
        showLogOut: props.showLogOut,
        user: state.user
    }
}

const mapDispatchToProps = {
    logOut
}

export default connect( mapStateToProps, mapDispatchToProps )( NavigationBar )