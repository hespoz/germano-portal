import axios from 'axios';
import Cookies from 'js-cookie'

const secureHeader = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${Cookies.get("token")}`
        }
    }
}

const apiHelper = {
    searchByExactKeyword: (payload) => {
        return axios.get(`http://localhost:7000/api/v1/dictionary/${payload}/true`)
    },
    searchByKeyword: (payload) => {
        return axios.get(`http://localhost:7000/api/v1/dictionary/${payload.keyword}/false`)
    },
    searchById: (payload) => {
        return axios.get(`http://localhost:7000/api/v1/dictionary/${payload}`)
    },
    addNewWord: (word) => {
        return axios.post(`http://localhost:7000/api/v1/dictionary`, word, secureHeader())
    },
    register: (data) => {
        return axios.post(`http://localhost:7000/api/v1/user`, data)
    },
    login: (data) => {
        return axios.post(`http://localhost:7000/api/v1/auth`, data)
    },
    fetchWords: (data) => {
        return axios.post(`http://localhost:7000/api/v1/dictionary/search`, data)
    },
    fetchBuckets: (data) => {
        return axios.get(`http://localhost:7000/api/v1/bucket/${data}`)
    },
    saveBucket: (data) => {
        return axios.post(`http://localhost:7000/api/v1/bucket`, data, secureHeader())
    },
    deleteBucket: (data) => {
        return axios.delete(`http://localhost:7000/api/v1/bucket/${data}`, secureHeader())
    }
}

export default apiHelper
