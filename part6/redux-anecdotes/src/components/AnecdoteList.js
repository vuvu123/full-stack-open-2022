import { useSelector, useDispatch } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(voteFor(id))
    const votedForAnecdote = anecdotes.find(a => a.id === id)
    dispatch(showNotification(`You voted '${votedForAnecdote.content}'`))
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
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList