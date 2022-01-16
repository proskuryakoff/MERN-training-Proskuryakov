import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../actions/users'
import { UsersList } from '../../components/UsersList/UsersList';
import Loader from '../../components/Loader/Loader';
 
const UsersPage = () => {
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.auth);
    useEffect(() => {
    const headers = {
        'Authorization': 'Bearer ' + authState.token
    }
      dispatch(getUsers(headers))
    }, [dispatch])
    const usersState = useSelector((state) => state.users);

    if (usersState.loading) {
        return (
          <Loader />
        )
      }

  return (
    <>
        <UsersList users={usersState.users} />
    </>
  );
}

export default UsersPage;
