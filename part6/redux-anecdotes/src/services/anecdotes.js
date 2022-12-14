import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (object) => {
  const id = object.id
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}

export default { getAll, createNew , update}
