/*
 * Author: Luis López
 * Website: https://github.com/luislopez-dev
 * Description: Training Project
 */
import axios from "axios";
const api_base_url = "http://localhost:8080/api/auth";

export const register = async (email, password, name) => {
    const request = await axios.post(`${api_base_url}/register`, {email, password, name});
    if(Number(request.status) === 200 && request.data.token){
        localStorage.setItem("token", request.data.token);
    }
    return request;
}

export const login = async (email, password) => {
    
    const request = await axios.post(`${api_base_url}/login`, {email, password});
    if(Number(request.status) === 200 && request.data.token){
        localStorage.setItem("token", request.data.token);
    }
    return request;
}