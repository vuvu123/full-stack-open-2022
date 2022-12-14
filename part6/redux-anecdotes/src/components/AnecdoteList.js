import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((b1, b2) => b2.votes - b1.votes)
  })

  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(updateVote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 10))
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