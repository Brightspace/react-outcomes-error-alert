import React from 'react';
import ErrorStore from './ErrorStore.js';
import { ErrorTypes } from './Constants.js';
import ErrorFloatingContainer from './ErrorFloatingContainer';  // eslint-disable-line no-unused-vars

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

		let refresh = 'refresh the page';
		if ( this.props.refresh ) {
			refresh = <a className='refresh-link' onClick={this.props.refresh}>{refresh}</a>;
		}

		if ( this.state.errorType === ErrorTypes.SERVER_ERROR ) {
			return (
				<ErrorFloatingContainer>
					<div className='server-error'>
						<div>
							<strong>Oops!</strong> We're having trouble connecting you. You might want to {refresh}, or try again later.
						</div>
					</div>
				</ErrorFloatingContainer>
			);
		}

		return (
			<ErrorFloatingContainer>
				<div className='conn-error' >
					<div>
						{this._buildSpinner()}
						<span className='server-error-text'>
							<strong>Oops!</strong> We're having trouble connecting you. We'll keep trying while this page is open, or you can try again later
						</span>
					</div>
				</div>
			</ErrorFloatingContainer>
		);
	}
}

ErrorAlert.propTypes = {
	refresh: React.PropTypes.func
};

export default ErrorAlert;
