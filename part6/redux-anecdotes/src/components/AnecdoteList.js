import { useSelector, useDispatch } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const byLikes = (b1, b2) => b2.votes > b1.votes ? 1 : -1

  const anecdotes = useSelector(state => state.sort(byLikes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
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