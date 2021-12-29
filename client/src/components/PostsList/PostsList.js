import React from 'react'
import {Link} from 'react-router-dom'
import Card from '../Card/Card'

export const PostsList = ({ posts }) => {
  if (!posts.length) {
    return <p>We have no posts yet!</p>
  }
  console.log("Posts: ", posts)
  return (
    <div>
        { posts.map((post) => {
            return (
                <Card 
                title={post.title} 
                content={post.content}/>
            )
            }) }
    </div>
      
  )
}