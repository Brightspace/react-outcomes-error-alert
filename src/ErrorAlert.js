import React from 'react';
import ErrorStore from './ErrorStore.js';
import { ErrorTypes } from './Constants.js';

class ErrorAlert extends React.Component {

	constructor() {
		super();
		this.state = ErrorStore.getErrorState();
		this._onChange = this._onChange.bind( this );
	}

	componentDidMount() {
		ErrorStore.addChangeListener( this._onChange );
	}

	componentWillUnmount() {
		ErrorStore.removeChangeListener( this._onChange );
	}

	_onChange() {
		this.setState( ErrorStore.getErrorState() );
	}

	_buildSpinner() {
		return (
			<div className='spinner-bg'>
				<div className='slice1'></div>
				<div className='slice2'></div>
				<div className='slice3'></div>
				<div className='slice4'></div>
				<div className='slice5'></div>
			</div>
		);
	}

	render() {

		if ( !this.state.errorHasHappened ) {
			return null;
		}

		if ( this.state.errorType === ErrorTypes.SERVER_ERROR ) {
			return (
				<div className='fatal-error'>
					<div>
						<b>Oops!</b> We're having trouble connecting you. You might want to <a className='refresh-link' onClick={this.props.refresh}>refresh the page</a>, or try again later.
					</div>
				</div>
			);
		}

		return (
			<div className='conn-error' >
				<div>
					{this._buildSpinner()}
					<span className='server-error-text'>
						<b>Oops!</b> We're having trouble connecting you. We'll keep trying while this page is open, or you can try again later
					</span>
				</div>
			</div>
		);
	}
}

ErrorAlert.propTypes = {
	refresh: React.PropTypes.func.isRequired
};

export default ErrorAlert;
