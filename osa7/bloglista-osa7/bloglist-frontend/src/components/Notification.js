import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
	const message = props.notifications
	
	if (message === null ) {
		return null
	}
	// check if the message is success message
	if (message.includes('you added blog')) {
		return (
			<div className="success">
				{message}
			</div>
		)
	}

	// return error message
	return (
		<div className="error">
			{message}
		</div>
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