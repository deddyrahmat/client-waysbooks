import axios from "config/Axios";


export default {
    create: (body, config) =>
        axios
            .post("/book", body, config)
            .then((res) => res.data),
    list: (page=1, perPage=5) =>
        axios
            .get("/book?page=${page}&perPage=${perPage}`)")
            .then((res) => res.data),
    bestSeller: () =>
        axios
            .get("/book/best-seller" )
            .then((res) => res.data),
    bySlug: (slug) =>
        axios
            .get(`/book/${slug}`)
            .then((res) => res.data),
}