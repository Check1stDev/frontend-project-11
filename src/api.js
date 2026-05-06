import axios from 'axios'


const fetchFeed = (url) => {
    return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
        .then(response => {
            return response.data.contents
        })
        .catch(() => {
            throw new Error('errors.network')
        })
} 

export default fetchFeed
