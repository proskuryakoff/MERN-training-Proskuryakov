import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getUsers, editUser, deleteUser } from '../../actions/users';
import Input from '../../components/Input/Input';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import './UsersPage.css'
 
const UsersPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isEditing, setEdit] = useState(false);
    const [form,setForm] = useState({
      id: null,
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
    const startEditHandler = (event) => {
      setEdit(true)
      const currentUser = usersState.users.find(user => user._id === event.target.id);
      setForm({
        id: currentUser._id,
        username: currentUser.username,
      })
    }

    const closeEditWindow = () => {
      setEdit(false)
    }

    const userEditHandler = (event) => {      
      event.preventDefault()
      const userId = form.id;
      try{
        const headers = {
          'Authorization': 'Bearer ' + authState.token
        }
        const url = '/auth/users/' + userId
        const formData = new FormData();
        formData.append('username', form.username)
        formData.append('roles', form.roles)
        dispatch(editUser(url, formData, headers, navigate));
      }
      catch(err){
          console.log(err);
          throw err;
      }
    }
    const userDeleteHandler = (event) => {      
      event.preventDefault()
      const headers = {
        'Authorization': 'Bearer ' + authState.token
      }
      const url = '/auth/users/' + event.target.id
      dispatch(deleteUser(url, headers, navigate));
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
        <p className='roles-label'>Roles</p>
        <div className='roles-field'>
          <Input placeholder='Roles' 
              className='role-input'
              id='role-admin'
              name='roles'
              type='radio'
              htmlFor='roles'
              value='ADMIN'
              onChange={changeHandler}
          />
          <label htmlFor='role-admin'>Admin</label>
          <Input placeholder='Roles' 
              className='role-input'
              id='role-user'
              name='roles'
              type='radio'
              htmlFor='roles'
              value='USER'
              onChange={changeHandler}
          />
          <label htmlFor='role-user'>User</label>
        </div>
        <div className='card-action'>
            <Button type='submit' disabled={!form.roles || !form.username} className='Button'>Update</Button>
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
                <td className='user-id'>{user._id}</td>
                <td className='user-email'>{user.email}</td>
                <td className='user-username'>{user.username}</td>
                <td className='user-roles'>{user.roles}</td>
                <td>
                  <Button className='edit-button' id={user._id} disabled={user._id === authState.userId} onClick={startEditHandler}>Edit</Button>
                  <Button className='delete-button' id={user._id} disabled={user._id === authState.userId} onClick={userDeleteHandler}>Delete</Button>
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
