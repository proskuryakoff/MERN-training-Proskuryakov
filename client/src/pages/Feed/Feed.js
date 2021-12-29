import React, {useState, useCallback, useEffect} from "react";
import { useHttp } from '../../hooks/http.hook';
import Loader from '../../components/Loader/Loader'
import { PostsList } from "../../components/PostsList/PostsList";


export const Feed = () => {
    const [posts, setPosts] = useState([])
    const {loading, request} = useHttp();
    const fetchPosts = useCallback(async () => {
        try {
          const fetched = await request('http://localhost:4000/', 'GET', null, {})
          setPosts([...fetched])
        } catch (err) {
          console.log(err);
          throw err;
        }
      }, [request])
    
      useEffect(() => {
        fetchPosts()
      }, [fetchPosts])
    
    if (loading) {
        return <Loader/>
    }
    return(
    <>
      { !loading && <PostsList posts={posts} />}
    </>
    )
}