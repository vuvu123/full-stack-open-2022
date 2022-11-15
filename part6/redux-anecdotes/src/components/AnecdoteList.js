import { useSelector, useDispatch } from 'react-redux';
import { updateVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(updateVote(anecdote))
    // const votedForAnecdote = anecdotes.find(a => a.id === id)
    dispatch(showNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div>
      {anecdotes
        .map(anecdote =>
          <div key={anecdote.id} style={style}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList