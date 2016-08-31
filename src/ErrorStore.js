import { EventEmitter } from 'events';
import AppDispatcher from './AppDispatcher.js';
import { Actions, ErrorTypes } from './Constants.js';

let errorType = '';
let errorHasHappened = false;

const ERROR_EVENT = 'errorEvent';

class ErrorStore extends EventEmitter {

	getErrorState() {
		return {
			errorType: errorType,
			errorHasHappened: errorHasHappened
		};
	}

	isErrorAlertVisible() {
		return errorHasHappened;
	}

	emitError() {
		this.emit( ERROR_EVENT );
	}

	addChangeListener( callback ) {
		this.on( ERROR_EVENT, callback );
	}

	removeChangeListener( callback ) {
		this.removeListener( ERROR_EVENT, callback );
	}
}

let _errorStore = new ErrorStore();
export default _errorStore;

ErrorStore.dispatchToken = AppDispatcher.register( payload => {
	let action = payload.action;

	switch ( action.actionType ) {

		case Actions.REQUEST_TIMEDOUT:
			errorHasHappened = true;
			errorType = ErrorTypes.CONN_ERROR;
			_errorStore.emitError();
			break;

		case Actions.REQUEST_FAILED:
			errorHasHappened = true;
			errorType = ErrorTypes.FATAL_ERROR;
			_errorStore.emitError();
			break;

		case Actions.REQUEST_SUCCEEDED:
			if ( errorHasHappened ) {
				errorHasHappened = false;
				errorType = '';
				_errorStore.emitError();
			}
			break;
	}

	return true; // No errors. Needed by promise in Dispatcher.
});
