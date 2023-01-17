import React, {useEffect} from 'react'
import Axios from 'config/Axios'
import { toast } from 'react-toastify';

function AutoRefresh() {
    useEffect(() => {
        console.log('refresh')
        Axios.interceptors.response.use(
            (response) => {
                if (response?.data?.status === 0) {
                    return toast.error(response.data.message);
                }
                return response
            },
            async (error) => {
                if (error) {
                    console.log("error in handler",error)
                    let message;
                
                    if (error.response) {
                      if (error.response.status === 400) {
                        // jika status yang ditermia 400 maka munculkan toast error
                        toast.error(error.response.data.message);
                      }
                
                      if (error.response.status === 401) {
                        // toast.error(error.response.data.message);
                        // const body = JSON.stringify({token : Cookies.get('refreshToken')});
                
                        // const config = {
                        //     headers: {
                        //         "content-type": "application/json",
                        //     },
                        // };
                
                        // const response = API.post('/auth/refresh', body, config).then(() => {
                        //     if (response.status === 200) {
                        //         // Cookies.set("refreshToken", Cookies.get('refreshToken'));
                        //         Cookies.set("accessToken", response.data.accessToken);
                        //         setAuthToken(response.data.accessToken);
                        //     }
                        // }); 
                
                      }
                
                      if (error.response.status === 500) {
                        // jika status yang ditermia 500 maka simpan message
                        message = "Something went terribly wrong";
                      } else message = error.message;
                
                      // jika tipe dari message string tampilkan pesan di console.log
                      if (typeof message === "string") toast.error(message);
                
                      // dan kembalikan error ke user
                      return Promise.reject(error);
                    }
                }
            }
        );
    },[])
  return Axios;
}

export default AutoRefresh