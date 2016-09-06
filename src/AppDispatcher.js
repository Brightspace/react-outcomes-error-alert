import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {

	handleBackgroundAction( action ) {
		this.dispatch({
			source: 'BACKGROUND_ACTION',
			action: action
		});
	}
}

let _AppDispatcher = new AppDispatcher();

export default _AppDispatcher;
