import React from 'react'
import Card from '../Card/Card'

export const PostsList = ({ posts }) => {
  if (!posts.length) {
    return <p>We have no posts yet!</p>
  }

  return (
    <div>
        { posts.map((post) => {
            return (
                <Card 
                id={post._id}
                title={post.title} 
                content={post.content}/>
            )
            }) }
    </div>
      
  )
}