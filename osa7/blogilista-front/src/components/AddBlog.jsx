import {useState} from 'react';




const AddBlog = ({createBlog}) => {
    const handleCreation = async (event) => {
        event.preventDefault();
        createBlog({title, author, url});
        settitle('');
        setauthor('');
        seturl('');
    };
    const [title, settitle] = useState('');
    const [author, setauthor] = useState('');
    const [url, seturl] = useState('');
    return (
        <div>
        <h2>create new</h2>
            <form>
                title<input id="title" value={title} onChange={({target}) => settitle(target.value)} type='text'/><br/>
                author<input id="author" value={author} onChange={({target}) => setauthor(target.value)} type='text'/><br/>
                url<input id="url" value={url} onChange={({target}) => seturl(target.value)} type="text"/><br/>
                <button id="create" onClick={handleCreation} type="submit">create</button>
            </form>
        </div>
    );
};

export default AddBlog;