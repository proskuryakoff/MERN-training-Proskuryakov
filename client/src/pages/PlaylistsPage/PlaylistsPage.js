import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylists } from '../../actions/playlists';
import Loader from '../../components/Loader/Loader';
import './PlaylistsPage.css'
 
const PlaylistsPage = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const playlistsState = useSelector((state) => state.playlists);
    useEffect(() => {
    const headers = {
        'Authorization': 'Bearer ' + authState.token
    }
      dispatch(getPlaylists(headers))
    }, [dispatch])
     if (playlistsState.loading) {
        return (
          <Loader />
        )
    }
    return (
        <h1>Playlists Page!</h1>
    )
}

export default PlaylistsPage;
