import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {

	handleMappingsViewAction( action ) {
		this.dispatch({
			source: 'MAPPINGS_VIEW_ACTION',
			action: action
		});
	}

	handleMappingsBackgroundAction( action ) {
		this.dispatch({
			source: 'MAPPINGS_BACKGROUND_ACTION',
			action: action
		});
	}
}

let _AppDispatcher = new AppDispatcher();

export default _AppDispatcher;
