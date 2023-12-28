/*
 * Author: Luis López
 * Website: https://github.com/luislopez-dev
 * Description: Training Project
 */
const axios = require("axios");
const api_base_url = "http://localhost:8080/api";
let token = "";

if(localStorage.getItem("token")){
  token = (JSON.parse(localStorage.getItem("token")));
}

export const createProduct = async (name, brand, manufacturer, price, description, ammount, imgURL) => {
  const request =  await axios.post(api_base_url,  {name, brand, manufacturer, price, description, ammount, imgURL}, {headers: {'Authorization': `Basic ${token}`}});
  return request;
}

export const getProducts = async(offset, limit) => {
  const request =  await axios.post(`${api_base_url}/products`, {offset, limit});
  return request.data;
}

export const getProduct = async (id) => {
  const request = await axios.get(`${api_base_url}/${id}`);
  return request;
}

export const queryItem = async (item, offset, limit) => {
  const request = await axios.post(`${api_base_url}/search`, {item, offset, limit});
  return request.data;
}

export const updateProduct = async(_id, name, brand, manufacturer, price, description, ammount, imgURL) => { 
  const request =  await axios.put(api_base_url,  {_id, name, brand, manufacturer, price, description, ammount, imgURL}, {headers: {'Authorization': `Basic ${token}`}});
  return request;
}

export const deleteProduct = async (id) => {
  const request =  await axios.delete(`${api_base_url}/${id}`, {headers: {'Authorization': `Basic ${token}`}});
  return request;
}
