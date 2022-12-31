import axios from "config/Axios";


export default {
    create: (body, config) =>
        axios
            .post("/book", body, config)
            .then((res) => res.data),
    list: () =>
        axios
            .get("/book")
            .then((res) => res.data),
    bestSeller: () =>
        axios
            .get("/book/best-seller" )
            .then((res) => res.data),
    bySlug: (slug) =>
        axios
            .get(`/book/best-seller/${slug}`)
            .then((res) => res.data),
}