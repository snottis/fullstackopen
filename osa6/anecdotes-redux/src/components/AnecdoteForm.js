import React from 'react'
import { connect } from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'



const AnecdoteForm = (props) =>
{
    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addAnecdote(content)
        props.setNotification(`Added '${content}'!`, 5)
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const dispatchToProps = {
    addAnecdote,
    setNotification
}

export default connect(null, dispatchToProps)(AnecdoteForm)