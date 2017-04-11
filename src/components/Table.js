import React from 'react'

import Button from './Button'

// Column sizes
const lgCol = { width: '40%' }
const mdCol = { width: '30%' }
const smCol = { width: '10%' }

// Higher order function
// Filter only when searchTerm is set
// When a searchTerm is set, match the incoming searchTerm pattern with
// the title of the item
const isSearched = searchTerm => item => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())

const Table = ({ list, pattern, onDismiss }) => {
	return (
		<div className="table">
			{list.filter(isSearched(pattern)).map(item =>
				<div
					key={item.objectID}
					className="table-row"
				>
					<span style={lgCol}>
						<a href={item.url}>{item.title}</a>
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
	)
}

export default Table