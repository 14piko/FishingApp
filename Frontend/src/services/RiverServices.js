import { HttpService } from "./HttpService";

async function get() {
    return await HttpService.get("/River")
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            console.error();
        });
}

async function getById(id) {
    return await HttpService.get("/River/" + id)
        .then((response) => {
            return {error: false, message: response.data}
        })
        .catch(() => {
            return {error: true, message: 'River with that ID doesnt exists!'}
        });
}

async function deleteRiver(id) {
    return await HttpService.delete('/River/' + id)
    .then((response) => {
        return {error: false, message: response.data.message}
    })
    .catch(() => {
        return {error: true, message: 'River cannot be deleted!'}
    })
}

async function addRiver(river) {
    console.log(river);
    return await HttpService.post('/River', river)
        .then((response) => {
            return {error: false, message: response.data}
        });
}

async function editRiver(id, river) {
    return await HttpService.put('/River/' + id, river)
        .then((response) => {
            return {error: false, message: response.data}
        });
}

async function getPaginator(page,condition){
    return await HttpService.get('/River/search-paginator/'+page + '?condition=' + condition)
    .then((response)=>{return  {error: false, message: response.data};})
    .catch((e)=>{ return {error: true, message: 'Error by searching users '}});
}

export default {
    get,
    getById,
    deleteRiver,
    addRiver,
    editRiver,
    getPaginator
};