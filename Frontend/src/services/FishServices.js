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

export default {
    get,
    getById,
    deleteFish,
    addFish,
    editFish
};