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

export default {
    get,
};