import axios from "config/Axios";


export default {
    update: (body, config) =>
        axios
            .patch("/user", body, config)
            .then((res) => res.data),
    updateAvatar: (body, config) =>
        axios
            .patch("/user/avatar", body, config)
            .then((res) => res.data),
}