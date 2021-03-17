import  {useState} from 'react';

import {useDispatch} from 'react-redux';
import {likeBlog, deleteBlog} from '../reducers/blogReducer';
import {setError, setSuccess} from '../reducers/notificationReducer';




const Blog = ({ blog, user}) => {
  const dispatch = useDispatch();
  const [visible, setvisible] = useState(false);
  const showWhenVisible = {display: visible ? '' : 'none'};
  const showWhenUser = {display: user.username == blog.user.username ? '' : 'none'};

  const handleLike = () => {
    try {
      dispatch(likeBlog({...blog, user: user.id}));
      dispatch(setSuccess(`Liked blog ${blog.title}`));
    }catch (error) {
      dispatch(setError('Error liking'));
    }  
  };

  const handleRemove = () => {
    dispatch(deleteBlog(blog.id));
    dispatch(setSuccess(`Removed blog ${blog.title}.`));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div className="blogOutest" style={blogStyle}>
      <div className="blogDefaults"> 
        {blog.title} {blog.author} <button className="viewButton" onClick={() => setvisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>likes <span className="likes">{blog.likes}</span> <button className="likeButton" onClick={handleLike}>like</button></div>
        <div>{blog.user.name}</div>
        <div style={showWhenUser}>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>

  </div>);
};
export default Blog;
