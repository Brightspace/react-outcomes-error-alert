import { Actions } from './Constants.js';
import AppDispatcher from './AppDispatcher.js';

export default {

	handleServerTimeout( err ) {
		AppDispatcher.handleMappingsBackgroundAction({
			actionType: Actions.REQUEST_TIMEDOUT,
			error: err
		});
	},

	handleServerError( err ) {
		AppDispatcher.handleMappingsBackgroundAction({
			actionType: Actions.REQUEST_FAILED,
			error: err
		});
	},

	hideErrorAlert() {
		AppDispatcher.handleMappingsBackgroundAction({
			actionType: Actions.REQUEST_SUCCEEDED
		});
	}
};
