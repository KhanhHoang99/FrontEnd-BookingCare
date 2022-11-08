import axios from "../axios";

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', {email, password})
}

const getAllUsers = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`)
}

const createNewUser = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user?id=${userId}`)
}

export default {handleLoginAPI, getAllUsers, createNewUser, deleteUserService}
