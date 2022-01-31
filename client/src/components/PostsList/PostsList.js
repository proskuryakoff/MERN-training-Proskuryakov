import React from 'react'
import Card from '../Card/Card'

export const PostsList = ({ posts }) => {
  if (!posts.length && window.location.href === 'http://localhost:3000/') {
    return <p>We have no posts yet!</p>
  } else if (!posts.length) {
    return <p>No posts found!</p>
  }

  return (
    <div>
        { posts.map((post) => {
            return (
                <Card 
                key={post._id}
                id={post._id}
                type={post.type} 
                title={post.title} 
                description={post.description}
                created={post.created}
                />
            )
            }) }
    </div>
      
  )
}