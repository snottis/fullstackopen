import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import {notify, clearNotify} from '../reducers/notificationReducer'
 
const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(addVote(id))
      dispatch(notify(`You voted '${anecdotes.filter(a => a.id === id)[0].content}'`))
      setTimeout(() => {
          dispatch(clearNotify())
      }, 5000)
    }

    return (
        <div>
        {anecdotes
        .filter(anecdote => 
            anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList