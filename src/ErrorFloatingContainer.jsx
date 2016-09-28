import React from 'react';
import ClassNames from 'classnames';

class ErrorFloatingContainer extends React.Component {

	constructor() {

		super();

		this.state = { isFloating: false };
		this.reposition = this.reposition.bind( this );
	}

	shouldComponentUpdate( nextProps, nextState ) {

		return this.state.isFloating !== nextState.isFloating;
	}

	componentDidMount() {

		// In the case that the docked message is not visible,
		// this repositions the error message to the top of the screen immediately
		setTimeout( () => { this.reposition(); }, 0 );
		window.addEventListener( 'scroll', this.reposition );
		window.addEventListener( 'resize', this.reposition );
	}

	componentWillUnMount() {

		window.removeEventListener( 'scroll', this.reposition );
		window.addEventListener( 'resize', this.reposition );
	}

	reposition() {

		let containerRect = this.refs.container.getBoundingClientRect();
		this.refs.placeHolderTop.style.height = containerRect.height + 'px';
		let placeHolderRect = this.refs.placeHolderTop.getBoundingClientRect();
		let updateWithRect;

		if ( this.state.isFloating ) {
			updateWithRect = placeHolderRect;
		} else {
			updateWithRect = containerRect;
		}

		let containerTop = updateWithRect.top;
		let nextFloatingState;

		if ( containerTop <= 0 ) {
			// Top of the container is out of the view, so the container needs to be floated
			nextFloatingState = true;
			this.refs.placeHolderTop.style.display = 'block';
			this.refs.innerContainer.style.left = '0px';
		} else {
			// Top of the container is in the view, so the container should be docked
			nextFloatingState = false;
			this.refs.placeHolderTop.style.display = 'none';
			this.refs.innerContainer.style.left = updateWithRect.left + 'px';
		}

		this.setState( { isFloating: nextFloatingState } );
	}

	render() {

		let containerClassName = ClassNames({
			'error-floating-container': true,
			'floating': this.state.isFloating
		});

		return (
				<div>
					<div ref='container' className={ containerClassName }>
						<div ref='innerContainer' className='inner-container'>
							{ this.props.children }
						</div>
					</div>
					<div ref='placeHolderTop' />
				</div>
			);
	}
}

export default ErrorFloatingContainer;
