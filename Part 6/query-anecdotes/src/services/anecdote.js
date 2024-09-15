import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>{
  if(newAnecdote.content.length < 5){
    return console.error('El valor tiene que tener mas de 5 caracteres');
  }

  return axios.post(baseUrl, newAnecdote).then(res => res.data)
}
  