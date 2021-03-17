import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import login from './services/login';
import AddBlog from './components/AddBlog';
import Notification from './components/Notification';




import './index.css';
import Togglable from './components/Togglable';
import {useDispatch, useSelector} from 'react-redux';
import {setNotification, setError, setSuccess} from './reducers/notificationReducer';
import {initBlogs, postBlog} from './reducers/blogReducer';
import {initUser, logIn, logOut} from './reducers/userReducer';





const App = () => {

  const blogs = useSelector(state => state.blog);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');

  const addBlogRef = useRef();

  useEffect(() => {
    dispatch(initUser());
    if(user)
    {
      blogService.setToken(user.token);
    }
      dispatch(initBlogs());  
  }, []);

  const addBlog = () => {
    return(<Togglable buttonLabel="new blog" ref={addBlogRef}>      
      <AddBlog createBlog={createBlog}/>
    </Togglable>);
  };

  const createBlog = async (newBlog) => {
    addBlogRef.current.toggleVisibility();
    try {
      dispatch(postBlog(newBlog));
      dispatch(setSuccess(`Added blog ${newBlog.title} by ${newBlog.author}`));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const removeBlog = async (id) => {
    const res = await blogService.remove(id);
    if(res.error) {
      dispatch(setNotification(res.error, 'error', 5));
    }
    else {
      dispatch(setNotification(`Removed ${res.title}!`, 'success', 5));
      blogs.splice(blogs.findIndex(x => x.id === res.id), 1);
      //const newBlogs = [...blogs];
      //setBlogs(newBlogs.sort(blogsort));
    }
  };

  const updateBlog = async (upBlog) => {
    const newBlog = { ...upBlog, user: upBlog.user.id, likes: upBlog.likes+1};
    delete newBlog.id;
    const res = await blogService.put(newBlog, upBlog.id);
    if(res.error) {
      setNotification(res.error, 'error', 5);
    }
    else {
      dispatch(setSuccess(`Liked ${newBlog.title}!`));
      const newBlogs = [...blogs];
      newBlogs[newBlogs.findIndex(x => x.id === upBlog.id)].likes += 1;
      //setBlogs(newBlogs.sort(blogsort));
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const ret = await login(userName, password);
    if(ret) {
      dispatch(logIn(ret));
      blogService.setToken(ret.token);
      dispatch(setSuccess('Logged in!'));
    }
    else {
      dispatch(setError('Error logging in'));
    }
  };

  const handleLogout = async () => {
    dispatch(logOut());
    blogService.setToken(null);
    dispatch(setSuccess('Logged out!'));
  };


  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification/>
        <form>
        username<input id="username" value={userName} onChange={({target}) => setuserName(target.value)} type="text" /><br/>
        password<input id="password" value={password} onChange={({target}) => setpassword(target.value)} type="password" /> <br/>
        <button id="logIn" type="submit" onClick={handleLogin}>log in</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
      {addBlog()}
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} removeBlog={removeBlog} />)}
    </div>
  );
};

export default App;
