import React, {useState} from 'react'
import blogs from '../services/blogs'
import notification from '../services/notification'



const AddBlog = ({createBlog}) => {
    const handleCreation = async (event) => {
        event.preventDefault();
        createBlog({title, author, url})
        settitle('')
        setauthor('')
        seturl('')
    }
    const [title, settitle] = useState('')
    const [author, setauthor] = useState('')
    const [url, seturl] = useState('')
    return (
        <div>
        <h2>create new</h2>
            <form>
                title<input value={title} onChange={({target}) => settitle(target.value)} type='text'/><br/>
                author<input value={author} onChange={({target}) => setauthor(target.value)} type='text'/><br/>
                url<input value={url} onChange={({target}) => seturl(target.value)} type="text"/><br/>
                <button onClick={handleCreation} type="submit">create</button>
            </form>
        </div>
    )
}

export default AddBlog