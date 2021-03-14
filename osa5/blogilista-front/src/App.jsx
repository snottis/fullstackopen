import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import login from './services/login';
import AddBlog from './components/AddBlog';
import Notification from './components/Notification';
import notification from './services/notification';
import './index.css';
import Togglable from './components/Togglable';







const App = () => {

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [notif, setNotif] = useState(null);

  const addBlogRef = useRef();

  const addBlog = () => {
    return(<Togglable buttonLabel="new blog" ref={addBlogRef}>      
      <AddBlog createBlog={createBlog}/>
    </Togglable>);
  };

  const blogsort = (a, b) => {
    if(a.likes < b.likes)
      return 1;
    else if(a.likes === b.likes)
      return 0;
    else
      return -1;
  };

  const createBlog = async (newBlog) => {
    addBlogRef.current.toggleVisibility();
    const res = await blogService.post(newBlog);
    if(res.error) {
        notification.failure(res.data.error.message, setNotif);
    }
    else {
        notification.success(`Added blog ${res.title} by ${res.author}`, setNotif);
        setBlogs(blogs.concat(res));
    }
  };

  const removeBlog = async (id) => {
    const res = await blogService.remove(id);
    if(res.error) {
      notification.failure(res.error, setNotif);
    }
    else {
      notification.success(`Removed ${res.title}!`, setNotif);
      blogs.splice(blogs.findIndex(x => x.id === res.id), 1);
      const newBlogs = [...blogs];
      setBlogs(newBlogs.sort(blogsort));
    }
  };

  const updateBlog = async (upBlog) => {
    const newBlog = { ...upBlog, user: upBlog.user.id, likes: upBlog.likes+1};
    delete newBlog.id;
    const res = await blogService.put(newBlog, upBlog.id);
    if(res.error) {
      notification.failure(res.error, setNotif);
    }
    else {
      notification.success(`Liked ${newBlog.title}!`, setNotif);
      const newBlogs = [...blogs];
      newBlogs[newBlogs.findIndex(x => x.id === upBlog.id)].likes += 1;
      setBlogs(newBlogs.sort(blogsort));
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const ret = await login(userName, password);
    if(ret) {
      setUser(ret);
      blogService.setToken(ret.token);
      window.localStorage.setItem('login', JSON.stringify(ret));
      notification.success('Logged in!', setNotif);
    }
    else {
      notification.failure('Error logging in', setNotif);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem('login');
    setUser(null);
    blogService.setToken(null);
    notification.success('Logged out!', setNotif);
  };

  useEffect(() => {
    let logged = window.localStorage.getItem('login');
    if(logged)
    {logged = JSON.parse(logged);
      setUser(logged);
      blogService.setToken(logged.token);}
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(blogsort)));
  }, []);
  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notif}/>
        <form>
        username<input value={userName} onChange={({target}) => setuserName(target.value)} type="text" /><br/>
        password<input value={password} onChange={({target}) => setpassword(target.value)} type="password" /> <br/>
        <button type="submit" onClick={handleLogin}>log in</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notif}/>
      <p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
      {addBlog()}
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} removeBlog={removeBlog} />)}
    </div>
  );
};

export default App;
