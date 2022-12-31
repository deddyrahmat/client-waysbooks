import { toast } from "react-toastify";

export default function dataHandler(dataRes) {
  //   console.log(`dataHanlder`, dataRes.data);
  // jika status = 0, itu berarti ada error dan tampilkan pesan(m) menggunakan toast
  if (dataRes?.data?.status === 0) {
    return toast.error(dataRes.data.message);
  }
  return dataRes;
}
