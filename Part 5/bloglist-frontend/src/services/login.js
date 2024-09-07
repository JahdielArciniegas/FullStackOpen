import axios from 'axios'
const baseUrl = '/api/login'

const login = async credetials => {
  const response = await axios.post(baseUrl, credetials)
  return response.data
}

export default { login }