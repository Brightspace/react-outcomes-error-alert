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

		const { serverErrorText, connectionErrorText, refreshText } = this.props;

		if ( !this.state.errorHasHappened ) {
			return null;
		}

		let refresh = null;
		if ( this.props.refresh ) {
			refresh = <a className='refresh-link' onClick={this.props.refresh}>{refreshText}</a>;
		}

		if ( this.state.errorType === ErrorTypes.SERVER_ERROR ) {
			return (
				<ErrorFloatingContainer>
					<div className='server-error'>
						<div>
							{serverErrorText} {refresh}
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
							{connectionErrorText}
						</span>
					</div>
				</div>
			</ErrorFloatingContainer>
		);
	}
}

ErrorAlert.propTypes = {
	refresh: React.PropTypes.func,
	serverErrorText: React.PropTypes.string,
	connectionErrorText: React.PropTypes.string,
	resfreshText: React.PropTypes.string
};

ErrorAlert.defaultProps = {
	serverErrorText: 'Oops! We\'re having trouble connecting you. You might want to refresh, or try again later.',
	connectionErrorText: 'Oops! We\'re having trouble connecting you. We\'ll keep trying while this page is open, or you can try again later',
	refreshText: 'refresh the page'
};

export default ErrorAlert;
