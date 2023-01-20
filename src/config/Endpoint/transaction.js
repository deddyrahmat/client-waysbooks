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
    listPending: (page=1, perPage=5) =>
        // page = halaman yang mau ditampilkan
        // perPage= jumlah data yang mau di tampilkan saat ini  
        axios
            .get(`/transaction/transactions-pending?page=${page}&perPage=${perPage}`)
            .then((res) => res.data),
    listCancel: (page=1, perPage=5) =>
        // page = halaman yang mau ditampilkan
        // perPage= jumlah data yang mau di tampilkan saat ini  
        axios
            .get(`/transaction/transactions-cancel?page=${page}&perPage=${perPage}`)
            .then((res) => res.data),
    changeStatus: (body, config) =>
        axios
            .post(`/transaction/status-payment`,body, config)
            .then((res) => res.data),
}