import React, {useState, useCallback, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useHttp } from '../../hooks/http.hook';
import Loader from '../../components/Loader/Loader'

export const SinglePost = () => {
    const [post, setPost] = useState([])
    const {loading, request} = useHttp();
    const postId = useParams().id;
    const fetchPost = useCallback(async () => {
        try {
          const fetchedPost = await request('http://localhost:4000/' + postId, 'GET', null, {})
          setPost(fetchedPost)
        } catch (err) {
          console.log(err);
          throw err;
        }
      }, [postId, request])

      useEffect(() => {
        fetchPost()
      }, [fetchPost])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <div>{post.content}</div>
        </div>
    )
}