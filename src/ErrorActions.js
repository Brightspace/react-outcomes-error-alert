import { Actions } from './Constants.js';
import AppDispatcher from './AppDispatcher.js';

export default {

	showConnErrorAlert( err ) {
		AppDispatcher.handleBackgroundAction({
			actionType: Actions.SHOW_CONN_ERROR,
			error: err
		});
	},

	showServerErrorAlert( err ) {
		AppDispatcher.handleBackgroundAction({
			actionType: Actions.SHOW_SERVER_ERROR,
			error: err
		});
	},

	hideErrorAlertIfVisible() {
		AppDispatcher.handleBackgroundAction({
			actionType: Actions.HIDE_ERROR
		});
	}
};
