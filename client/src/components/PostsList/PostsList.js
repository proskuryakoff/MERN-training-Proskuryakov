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
                key={post._id}
                id={post._id}
                title={post.title} 
                description={post.description}
                created={post.created}
                />
            )
            }) }
    </div>
      
  )
}