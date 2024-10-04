import { HttpService } from "./HttpService"


async function get(){
    return await HttpService.get('/Fishing')
    .then((response)=>{
        return response.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getById(id){
    return await HttpService.get('/Fishing/' + id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Fishing doesnt exist!'}
    })
}

async function deleteFishing(id) {
    return await HttpService.delete('/Fishing/' + id)
    .then((response)=>{
        return {error: false, message: response.data}
    })
    .catch(()=>{
        return {error: true, message: 'Fishing cannot be deleted!'}
    })
}

async function addFishing(Fishing) {
    return await HttpService.post('/Fishing',Fishing)
    .then((response) => {
        return {error: false, message: response.data}
    })
    .catch((e) => {
        switch (e.status) {
            case 400: {
                let messages = '';
                for (const key in e.response.data.errors) {
                    messages += key + ': ' + e.response.data.errors[key][0] + '\n';
                }
                return {error: true, message: messages};
            }
            default:
                return {error: true, message: 'Fishing cannot be added!'};
        }
    });
}

async function editFishing(id, Fishing) {
    return await HttpService.put('/Fishing/' + id, Fishing)
    .then((response) => {
        return {error: false, message: response.data};
    })
    .catch((e) => {
        switch (e.status) {
            case 400: {
                let messages = '';
                for (const key in e.response.data.errors) {
                    messages += key + ': ' + e.response.data.errors[key][0] + '\n';
                }
                return {error: true, message: messages};
            }
            default:
                return {error: true, message: 'Fishing cannot be changed!'};
        }
    });
}

export default{
    get,
    getById,
    deleteFishing,
    addFishing,
    editFishing
}