import { toast } from "react-toastify";
import Cookies from 'js-cookie';

export default function errorHandler(error) {
  if (error) {
    // console.log("error in handler",error)
    let message;

    if (error.response) {
      if (error.response.status === 400) {
        // jika status yang ditermia 400 maka munculkan toast error
        toast.error(error.response.data.message);
      }
      
      if (error.response.status === 401) {
        Cookies.set('statusToken', 'expired')
        window.location.href = '/'
      }

      if (error.response.status === 403) {
        toast.error("Please login");
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
