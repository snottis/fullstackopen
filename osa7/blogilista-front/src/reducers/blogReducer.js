import blogs from '../services/blogs';

export const blogsort = (a, b) => {
    if(a.likes < b.likes)
      return 1;
    else if(a.likes === b.likes)
      return 0;
    else
      return -1;
  };

export const initBlogs = () => {
    return async dispatch => {
        const res = await blogs.getAll();
        return dispatch({type: 'INIT', data: res});
    };
};

export const postBlog = (blog) => {
    return async dispatch => {
        const res = await blogs.post(blog);
        return dispatch({type: 'CREATE', data: res});
    };
};

export const likeBlog = (blog) => {
    return async dispatch => {
        const {id, ...newBlog} = blog;
        newBlog.likes += 1;
        const res = await blogs.put(newBlog, id);

        return dispatch({type: 'LIKE', data: res});
    };
};

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogs.remove(id);
        return dispatch({type: 'DELETE', data: id});
    };
};

const reducer = (state = [], action) => {
    let newBlogs;
    switch(action.type) {
        case 'CREATE':
            return state.concat(action.data).sort(blogsort);
        case 'INIT':
            return action.data.sort(blogsort);
        case 'LIKE':
            newBlogs = [...state];
            newBlogs[newBlogs.findIndex(x => x.id === action.data.id)].likes += 1;
            return newBlogs.sort(blogsort);
        case 'DELETE':
            newBlogs = [...state];
            newBlogs.splice(newBlogs.findIndex(x => x.id === action.data), 1);
            return newBlogs.sort(blogsort);
        default:
            return state;
    }
};

export default reducer;