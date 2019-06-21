import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
	const message = props.notifications
	
	if (message === null ) {
		return null
	}
	// check if the message is success message
	if (message.includes('you added blog')) {
		return (
			<Alert variant="success">
				{message}
			</Alert>
		)
	}

	// return error message
	return (
		<Alert variant="danger">
			{message}
		</Alert>
	)
}

const mapStateToProps = (state) => {
	return {
		notifications: state.notifications
	}
}



export default connect(
	mapStateToProps,
	null
)(Notification) 