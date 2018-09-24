import axios from 'axios';

const secureHeader = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${localStorage.getItem("token")}`
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
    }
}

export default apiHelper
