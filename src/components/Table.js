import React from 'react'
import PropTypes from 'prop-types'
import { sortBy } from 'lodash'

import Button from './Button'
import Sort from './Sort'

import { lgCol, mdCol, smCol } from '../constants'

// Sort functions
// Default sortKey === NONE, no sorting occurs
// COMMENTS and POINTS are reversed to display highest to lowest
export const SORTS = {
	NONE: list => list,
	TITLE: list => sortBy(list, 'title'),
	AUTHOR: list => sortBy(list, 'author'),
	COMMENTS: list => sortBy(list, 'num_comments').reverse(),
	POINTS: list => sortBy(list, 'points').reverse()
}

const Table = ({
	list,
	onDismiss,
	sortKey,
	onSort,
	isSortReverse
}) => {
	const sortedList = SORTS[sortKey](list)
	const reverseSortedList = isSortReverse
		? sortedList.reverse()
		: sortedList

	return (
		<div className="table">
			<div className="table-header">
				<span style={lgCol}>
					<Sort
						sortKey={'TITLE'}
						onSort={onSort}
					>
						Title
					</Sort>
				</span>
				<span style={mdCol}>
					<Sort
						sortKey={'AUTHOR'}
						onSort={onSort}
					>
						Author
					</Sort>
				</span>
				<span style={smCol}>
					<Sort
						sortKey={'COMMENTS'}
						onSort={onSort}
					>
						Comments
					</Sort>
				</span>
				<span style={smCol}>
					<Sort
						sortKey={'POINTS'}
						onSort={onSort}
					>
						Points
					</Sort>
				</span>
				<span style={smCol}>
					Archive
				</span>
			</div>
			{
				reverseSortedList.map(item =>
					<div
						key={item.objectID}
						className="table-row"
					>
						<span style={lgCol}>
							<a
								href={item.url}
								target="_blank"
							>
								{item.title}
							</a>
						</span>
						<span style={mdCol}>
							{item.author}
						</span>
						<span style={smCol}>
							{item.num_comments}
						</span>
						<span style={smCol}>
							{item.points}
						</span>
						<span style={smCol}>
							{item.objectID}
						</span>
						<span>
							<Button
								onClick={() => onDismiss(item.objectID)}
								className="button-inline"
							>
								Dismiss
          		</Button>
						</span>
					</div>
				)
			}
		</div >
	)
}

Table.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			objectID: PropTypes.string.isRequired,
			author: PropTypes.string,
			url: PropTypes.string,
			num_comments: PropTypes.number,
			points: PropTypes.number
		})
	).isRequired,
	onDismiss: PropTypes.func.isRequired,
	sortKey: PropTypes.string.isRequired,
	onSort: PropTypes.func.isRequired
}


export default Table