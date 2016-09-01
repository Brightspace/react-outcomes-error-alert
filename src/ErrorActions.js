import { Actions } from './Constants.js';
import AppDispatcher from './AppDispatcher.js';

export default {

	showConnErrorAlert( err ) {
		AppDispatcher.handleMappingsBackgroundAction({
			actionType: Actions.SHOW_CONN_ERROR,
			error: err
		});
	},

	showServerErrorAlert( err ) {
		AppDispatcher.handleMappingsBackgroundAction({
			actionType: Actions.SHOW_SERVER_ERROR,
			error: err
		});
	},

	hideErrorAlertIfVisible() {
		AppDispatcher.handleMappingsBackgroundAction({
			actionType: Actions.HIDE_ERROR
		});
	}
};
