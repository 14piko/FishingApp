import { HttpService } from "./HttpService";

async function get() {
    return await HttpService.get("/Fish")
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            console.error();
        });
}

async function getById(id) {
    return await HttpService.get("/Fish/" + id)
        .then((response) => {
            return {error: false, message: response.data}
        })
        .catch(() => {
            return {error: true, message: 'Fish with that ID doesnt exists!'}
        });
}

async function deleteFish(id) {
    return await HttpService.delete('/Fish/' + id)
    .then((response) => {
        return {error: false, message: response.data.message}
    })
    .catch(() => {
        return {error: true, message: 'Fish cannot be deleted!'}
    })
}

async function addFish(fish) {
    console.log(fish);
    return await HttpService.post('/Fish', fish)
        .then((response) => {
            return {error: false, message: response.data}
        });
}

async function editFish(id,fish) {
    return await HttpService.put('/Fish/' + id, fish)
        .then((response) => {
            return {error: false, message: response.data}
        });
}

async function getPaginator(page,condition){
    return await HttpService.get('/Fish/search-paginator/'+page + '?condition=' + condition)
    .then((response)=>{return  {error: false, message: response.data};})
    .catch((e)=>{ return {error: true, message: 'Error by searching users '}});
}

async function setImage(id, image) {
    return await HttpService.put('/Fish/set-image/' + id, image)
    .then((response)=>{return  {error: false, message: response.data};})
    .catch((e)=>{ return {error: true, message: 'Error while uploading fish image '}});
  }

export default {
    get,
    getById,
    deleteFish,
    addFish,
    editFish,
    getPaginator,
    setImage
};