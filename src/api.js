import axios from 'axios'

const Api = axios.create({
    baseURL: `https://registry.npmjs.org/-/v1/search`,
})

export default Api