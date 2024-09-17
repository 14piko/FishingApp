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

async function deleteUser(userId) {
    return await HttpService.delete('/User/' + userId)
    .then((response) => {
        return {error: false, message: response.data.message}
    })
    .catch((e) => {
        return {error: true, message: 'User cannot be deleted!'}
    })
}

export default {
    get,
    deleteUser
};