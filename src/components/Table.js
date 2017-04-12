import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

// Column sizes
const lgCol = { width: '40%' }
const mdCol = { width: '30%' }
const smCol = { width: '10%' }

const Table = ({ list, onDismiss }) =>
	<div className="table">
		{list.map(item =>
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
		)}
	</div>

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
	onDismiss: PropTypes.func.isRequired
}

export default Table