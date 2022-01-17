import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../actions/users'
import Input from '../../components/Input/Input';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import './UsersPage.css'
 
const UsersPage = () => {
    const dispatch = useDispatch()
    const [isEditing, setEdit] = useState(false);
    const [form,setForm] = useState({
      username: '',
      roles: null,
    });
    const authState = useSelector((state) => state.auth);
    useEffect(() => {
    const headers = {
        'Authorization': 'Bearer ' + authState.token
    }
      dispatch(getUsers(headers))
    }, [dispatch])
    const usersState = useSelector((state) => state.users);

    const changeHandler = event => {
      setForm({...form, [event.target.name]: event.target.value})
    }
    const startEditHandler = () => {
      setEdit(true)
      setForm({
        username: usersState.users.username,
        roles: usersState.users.roles,
      })
    }

    const closeEditWindow = () => {
      setEdit(false)
    }

    const userEditHandler = () => {      

    }
    const userDeleteHandler = () => {      

    }

    if (usersState.loading) {
        return (
          <Loader />
        )
    }


    if(isEditing) {
      return (
        <Form title='Update the Post' onSubmit={userEditHandler}>
        <Input placeholder='Username' 
            className='default-input'
            id='username'
            name='username'
            type='text'
            htmlFor='username'
            value={form.username}
            onChange={changeHandler}
        />
        <Input placeholder='Roles' 
            className='default-input'
            id='roles'
            name='roles'
            type='text'
            htmlFor='roles'
            value={form.roles}
            onChange={changeHandler}
        />
        <div className='card-action'>
            <Button type='submit' className='Button'>Update</Button>
            <Button onClick={closeEditWindow} className='Button'>Close</Button>
        </div>
        </Form>
      )
    }

  return (
    <div>
      <table className="table">
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
          { usersState.users.map((user) => {
              return (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.roles}</td>
                <td>
                  <Button className='edit-button' onClick={startEditHandler}>Edit</Button>
                  <Button className='delete-button' onClick={userDeleteHandler}>Delete</Button>
                </td>
              </tr>
            )
            }) }
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
