import axios from "config/Axios";


export default {
    create: (body, config) =>
        axios
            .post("/book", body, config)
            .then((res) => res.data),
    list: (page=1, perPage=5) =>
        axios
            .get(`/book?page=${page}&perPage=${perPage}`)
            .then((res) => res.data),
    search: (page=1, perPage=5, keyword='') =>
        axios
            .get(`/book/search?page=${page}&perPage=${perPage}&keyword=${keyword}`)
            .then((res) => res.data),
    bestSeller: () =>
        axios
            .get("/book/best-seller" )
            .then((res) => res.data),
    bySlug: (slug) =>
        axios
            .get(`/book/${slug}`)
            .then((res) => res.data),
    bookUser: () =>
        axios
            .get(`/book/book-user`)
            .then((res) => res.data),
    purchased: (page=1, perPage=5) =>
            axios
                .get(`/book/purchased?page=${page}&perPage=${perPage}`)
                .then((res) => res.data),
}