import { HttpService } from "./HttpService";

async function get() {
    return await HttpService.get("/User")
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            console.error();
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

async function editUser(id,user) {
    return await HttpService.put('/User/' + id,user)
        .then((response) => {
            return {error: false, message: response.data}
        });
}

export default {
    get,
    getById,
    deleteUser,
    addUser,
    editUser
};