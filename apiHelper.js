import axios from 'axios';
import Cookies from 'js-cookie'

//const host = process.env.NODE_ENV === "production" ? "https://frozen-fortress-74429.herokuapp.com" : "http://localhost:7000"

const host = process.env.HOST

const secureHeader = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get("token")}`
        }
    }
}

const apiHelper = {
    searchByExactKeyword: (payload) => {
        return axios.get(`${host}/api/v1/dictionary/${payload}/true`)
    },
    searchByKeyword: (payload) => {
        return axios.get(`${host}/api/v1/dictionary/${payload.keyword}/false`)
    },
    searchById: (payload) => {
        return axios.get(`${host}/api/v1/dictionary/${payload}`)
    },
    addNewWord: (word) => {
        return axios.post(`${host}/api/v1/dictionary`, word, secureHeader())
    },
    register: (data) => {
        return axios.post(`${host}/api/v1/user`, data)
    },
    confirmUser: (data) => {
        return axios.put(`${host}/api/v1/user/confirm/${data}`, null, secureHeader())
    },
    login: (data) => {
        return axios.post(`${host}/api/v1/auth`, data)
    },
    fetchWords: (data) => {
        return axios.post(`${host}/api/v1/dictionary/search`, data)
    },
    fetchBuckets: (data) => {
        return axios.get(`${host}/api/v1/bucket/name/${data}`)
    },
    fetchBucketDetails: (data) => {
        return axios.get(`${host}/api/v1/bucket/${data}`)
    },
    saveBucket: (data) => {
        return axios.post(`${host}/api/v1/bucket`, data, secureHeader())
    },
    deleteBucket: (data) => {
        return axios.delete(`${host}/api/v1/bucket/${data}`, secureHeader())
    },
    addComment: (data) => {
        return axios.post(`${host}/api/v1/comment`, data, secureHeader())
    },
    editComment: (data) => {
        return axios.put(`${host}/api/v1/comment`, data, secureHeader())
    },
    deleteComment: (data) => {
        return axios.delete(`${host}/api/v1/comment/${data.sentenceId}/${data.commentId}`, secureHeader())
    },
    fetchLastBuckets: (data) => {
        return axios.get(`${host}/api/v1/bucket/last/${data}`)
    },
    fetchActivity: (data) => {
        return axios.get(`${host}/api/v1/activity/${data}`, secureHeader())
    },
    verificationStatus: () => {
        return axios.get(`${host}/api/v1/auth/confirmation/status`, secureHeader())
    },
    resendVerificationEmail: () => {
        return axios.put(`${host}/api/v1/auth/resend/verification`, null, secureHeader())
    },
    recoveryPassword: (email) => {
        return axios.put(`${host}/api/v1/auth/recover/password/${email}`, null)
    },
    resetPassword: (data) => {
        return axios.put(`${host}/api/v1/auth/reset/password`, data)
    },
    changePassword: (data) => {
        return axios.put(`${host}/api/v1/auth/change/password`, data, secureHeader())
    },
    fetchUserInfo: () => {
        return axios.get(`${host}/api/v1/user/info`, secureHeader())
    },
    saveUserInfo: (data) => {
        return axios.put(`${host}/api/v1/user/info`, data, secureHeader())
    },
    saveUserInfoConfirm: (data) => {
        return axios.put(`${host}/api/v1/user/info/confirm/${data}`, null, secureHeader())
    }


}

export default apiHelper
