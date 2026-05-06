import axios from 'axios'


const fetchFeed = (url) => {
    return axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
        .then(response => {
            return response.data.contents
        })
        .catch(() => {
            throw new Error('Network error')
        })
} 

export default fetchFeed
