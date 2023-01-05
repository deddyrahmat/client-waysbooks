import axios from "config/Axios";


export default {
    upload: (body, config) =>
        axios
            .post("/transaction", body, config)
            .then((res) => res.data),
    list: () =>
        axios
            .get("/book")
            .then((res) => res.data),
}