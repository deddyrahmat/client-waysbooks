import axios from "config/Axios";


export default {
    upload: (body, config) =>
        axios
            .post("/transaction", body, config)
            .then((res) => res.data),
    list: (page=1, perPage=5) =>
        // page = halaman yang mau ditampilkan
        // perPage= jumlah data yang mau di tampilkan saat ini  
        axios
            .get(`/transaction?page=${page}&perPage=${perPage}`)
            .then((res) => res.data),
}