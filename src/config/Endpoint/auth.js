import axios from "config/Axios";


export default {
    register: (body, config) =>
        axios
            .post("/user/register", body, config)
            .then((res) => res.data),
    login: (body, config) =>
        axios
            .post("/user/login", body, config)
            .then((res) => res.data),
    refresh: (body, config) =>
        axios
            .post("/user/refresh", body, config)
            .then((res) => res.data),
}