import axios from 'axios';
// import Cookies from 'js-cookie';

import dataHandler from './dataHandler';
import errorHandler from './errorHandler';

// create default baseurl axios
const Axios = axios.create({
    // baseURL : "http://localhost:8000/api/v1"
    baseURL : "https://api-waysbooks.projectsdeddy.web.id/api/v1"
})

// saat axios menerima response, jika berhasil maka akan menampilkan response dan jika gagal akan eksekusi errorHandler
Axios.interceptors.response.use(
    (response) => dataHandler(response),
    errorHandler
);

export const setAuthToken = (token) => {
    // diaktifkan di app.js
    // dengan cara
    // if (Cookies.get('accessToken')) {
    // //jika access token di cookie ada, simpan accesstoken ke axios
    //     setAuthToken(Cookies.get('accessToken'))
    //   }
    if (token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete Axios.defaults.headers.common['Authorization'];
    }
}

export default Axios;