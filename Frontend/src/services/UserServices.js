import { HttpService } from "./HttpService";

async function get() {
    return await HttpService.get("/User")
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            console.error(e);
        });
}

async function getById(id) {
    return await HttpService.get("/User/" + id)
        .then((response) => {
            return {error: false, message: response.data}
        })
        .catch(() => {
            return {error: true, message: 'User with that ID doesnt exists!'}
        });
}

async function deleteUser(id) {
    return await HttpService.delete('/User/' + id)
    .then((response) => {
        return {error: false, message: response.data.message}
    })
    .catch(() => {
        return {error: true, message: 'User cannot be deleted!'}
    })
}

async function addUser(user) {
    console.log(user);
    return await HttpService.post('/User', user)
        .then((response) => {
            return {error: false, message: response.data}
        });
}

async function editUser(id, user) {
    return await HttpService.put('/User/' + id,user)
        .then((response) => {
            return {error: false, message: response.data}
        });
}

async function getPaginator(page,condition){
    return await HttpService.get('/User/search-paginator/'+page + '?condition=' + condition)
    .then((response)=>{return  {error: false, message: response.data};})
    .catch((e)=>{ return {error: true, message: 'Error by searching users '}});
}

async function setImage(id, image) {
    return await HttpService.put('/User/set-image/' + id, image)
    .then((response)=>{return  {error: false, message: response.data};})
    .catch((e)=>{ return {error: true, message: 'Error while uploading user image '}});
  }

export default {
    get,
    getById,
    deleteUser,
    addUser,
    editUser,
    getPaginator,
    setImage
}