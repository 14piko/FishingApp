import { HttpService } from './HttpService';

export async function logInService(results) {
  return await HttpService
    .post('/Authorization/token', results)
    .then((response)=>{return  {error: false, message: response.data};})
    .catch((e)=>{ return {error: true, message: 'Email or password incorrect! '}});
}