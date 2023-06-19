import {errorHandling} from '../errorHandling/errorHandling';

const API_URL = 'https://burger-queen-api-mock-xi.vercel.app';

export const request = async (endpoint, method, headers, body) =>{
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };
  if(body){
    options.body = JSON.stringify(body);
  }
  const response = await fetch(`${API_URL}/${endpoint}`, options)
  //console.log(response);

  const result = await response.json();
  
  if(response.ok){
    return result;
  } 
  errorHandling(result);  
}