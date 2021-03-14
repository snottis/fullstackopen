import React, {useState} from 'react';
import Togglable from './Togglable';



const Blog = ({ blog, updateBlog, user, removeBlog }) => {

  const [visible, setvisible] = useState(false)
  const showWhenVisible = {display: visible ? '' : 'none'}
  const showWhenUser = {display: user.username === blog.user.username ? '' : 'none'}

  const handleLike = () => {
    updateBlog(blog)
  }

  const handleRemove = () => {
    removeBlog(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div> 
        {blog.title} {blog.author} <button onClick={() => setvisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        <div style={showWhenUser}>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>

  </div>)
}
export default Blog;
