import React, { useEffect, useState } from 'react'
import blogService from '../services/blogService'

const Users = () => {
	useEffect(() => {
		refreshData()
	}, [])

	const [data, setData] = useState(null)
	const refreshData = async () => {
		let data = await blogService.leaderboard();
		console.log(data)
		setData(data);
	}

	if (data === null)
		return <h2>Loading...</h2>

	return (
		<>
			<h2>Users</h2>
			<table className='table table-striped' aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>Author</th>
						<th>Posts</th>
					</tr>
				</thead>
				<tbody>
					{data.map(u =>
						<tr key={u.key}>
							<td>{u.key}</td>
							<td>{u.value}</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	)
}

export default Users