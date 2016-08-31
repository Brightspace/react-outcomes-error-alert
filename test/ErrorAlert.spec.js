import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import ErrorAlert from '../src/ErrorAlert.js';
import ErrorActions from '../src/ErrorActions.js';
import { ErrorTypes } from '../src/Constants.js';

function verifyAlertIsHidden( node ) {
	ErrorActions.hideErrorAlert();
	let state = node.state;
	expect( ReactDOM.findDOMNode( alert.node ) ).to.equal( null );
	expect( state.errorHasHappened ).to.be.false;
	expect( state.errorType ).to.equal( '' );
}

describe( 'ErrorAlert', () => {
	it( 'no error, error alert should be null', () => {
		const alert = shallow( <ErrorAlert /> );
		expect( alert.node ).to.equal( null );
	});

	it( 'trigger connection error, error alert should be connection error', () => {
		const alert = mount( <ErrorAlert /> );
		verifyAlertIsHidden( alert.node );

		ErrorActions.showConnErrorAlert();
		const state = alert.node.state;
		expect( state.errorHasHappened ).to.be.true;
		expect( state.errorType ).to.equal( ErrorTypes.CONN_ERROR );
		expect( alert.node ).to.not.equal( null );
		expect( ReactDOM.findDOMNode( alert.node ).className ).to.equal( 'conn-error' );

		verifyAlertIsHidden( alert.node );
	});

	it( 'trigger server error, error alert should be server error', () => {
		const alert = mount( <ErrorAlert /> );
		verifyAlertIsHidden( alert.node );

		ErrorActions.showServerErrorAlert();

		const state = alert.node.state;
		expect( state.errorHasHappened ).to.be.true;
		expect( state.errorType ).to.equal( ErrorTypes.SERVER_ERROR );
		expect( alert.node ).to.not.equal( null );
		expect( ReactDOM.findDOMNode( alert.node ).className ).to.equal( 'server-error' );

		verifyAlertIsHidden( alert.node );
	});
});
