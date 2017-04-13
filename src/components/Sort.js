import React from 'react'
import classNames from 'classnames'

import Button from './Button'

const Sort = ({
	sortKey,
	onSort,
	children,
	activeSortKey
}) => {
	// Add styling classes dynamically to indicate
	// active sorting header
	const sortClass = classNames(
		'button-inline',
		{ 'button-active': sortKey === activeSortKey }
	)

	return (
		<Button
			onClick={() => onSort(sortKey)}
			className={sortClass}
		>
			{children}
		</Button>
	)
}

export default Sort