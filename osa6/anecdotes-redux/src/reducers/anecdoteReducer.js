import service from '../services/anecdotes'



const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const aSort = (a,b) => {
  if(a.votes < b.votes)
    return 1
  else if(a.votes === b.votes)
    return 0
  else
    return -1
}
 
export const addVote = (anecdote) => {
  return async dispatch => {
    anecdote.votes += 1
    const res = await service.put(anecdote)
    dispatch({type: 'VOTE', data: anecdote.id})
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await service.post(asObject(content))
    dispatch({type: 'ADD', data: anecdote})
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await service.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state =  [], action) => {
  switch(action.type) {
    case 'VOTE':
      return state.map(anecdote => {
        if(anecdote.id === action.data.id)
          return {...anecdote, votes: anecdote.votes+1}
        else
          return anecdote
      }).sort(aSort)
    case 'ADD':
      return state.concat(action.data).sort(aSort)
    case 'INIT_ANECDOTES':
      return action.data.sort(aSort)
    default:
      return state
  }
}

export default reducer