import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ onClick, className, children }) =>
	<button
		onClick={onClick}
		className={className}
		type="button"
	>
		{children}
	</button>

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired
}

// This implementation is similar to setting the default
// parameter within the arguments array
Button.defaultProps = {
	className: ''
}

export default Button