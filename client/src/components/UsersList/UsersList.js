import React, { useState } from 'react'
import Button from '../Button/Button'
import './UsersList.css'

export const UsersList = ({ users }) => {
  const [isEditing, setEdit] = useState(false)
  if (!users.length) {
    return <p>No users!</p>
  }

  return (
    <div>
      <table class="table">
	<thead>
		<tr>
			<th>User ID</th>
			<th>Email</th>
			<th>Username</th>
			<th>Roles</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
    { users.map((user) => {
        return (
        <tr key={user._id}>
          <td>{user._id}</td>
          <td>{user.email}</td>
          <td>{user.username}</td>
          <td>{user.roles}</td>
          <td>
            <Button className='edit-button'>Edit</Button>
            <Button className='delete-button'>Delete</Button>
          </td>
        </tr>
      )
      }) }
  </tbody>
  </table>
</div>
      
  )
}