import React, { useState, useEffect } from "react";
import moment from "moment";
import idLocale from "moment/locale/id";
import LoadingAnimate from "components/atoms/LoadingAnimate";
import { rupiah } from "utils/FormatCurrency";
import ApiTransaction from 'config/Endpoint/transaction';
import Modal from "components/atoms/Modal";

function PaymentCancel() {
    moment.locale("id", idLocale);

    // data for payment pending
    const [paymentPending, setPaymentPending] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);

    // handle preview image payment in modal popup
    const [imageTransfer, setImageTransfer] = useState("");

    const [previewImage, setPreviewImage] = useState(false);
    const handlePreview = () => {
        setPreviewImage(!previewImage);
    };

    const handleTransfer = (value) => {
        setImageTransfer(value);
        setPreviewImage(true);
    };
    // console.log('dataBooks', dataBooksName)

    const prosesListBooks = async () => {
        setIsLoading(true);
        try {
            const response = await ApiTransaction.listCancel(page, limit);

            if (response.status === 1) {
                setPaymentPending(response.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Your System ", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        prosesListBooks();
    }, [page]);
    // console.log("paymentPending", paymentPending);
    const [canPreviousPage, setCanPreviousPage] = useState(false);
    const previousPage = () => {
        if (page === 1) {
            setCanPreviousPage(false);
        } else {
            setCanPreviousPage(true);
            setPage(page - 1);
        }
    };
    const [canNextPage, setCanNextPage] = useState(true);
    const nextPage = () => {
        if (paymentPending.length === 0) {
            setCanNextPage(false);
        } else {
            setCanNextPage(true);
            setPage(page + 1);
        }
    };
    return (
        <>
            <Modal
                open={previewImage}
                handleProps={() => handlePreview()}
                className="w-full sm:w-2/4"
            >
                <div className="h-1/2 w-1/2 mx-auto mt-5 mb-3 cursor-pointer">
                    <img
                        src={imageTransfer}
                        alt="bukti transfer"
                        className="object-cover object-center w-full h-full"
                    ></img>
                </div>
            </Modal>
            {/* pending */}
            <h5 className="font-bold text-xl mb-3 font-tinos">
                Payment Cancel
            </h5>
            <div className="h-full w-full overflow-x-scroll">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="lg:w-40">Evidence of Transfer</th>
                            <th>Product Purchased</th>
                            <th>Date Transaction</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <LoadingAnimate />
                        ) : paymentPending.length > 0 ? (
                            paymentPending.map((payment) => (
                                <tr key={payment.id}>
                                    <td
                                        className="w-[40px] h-[40px] mx-auto cursor-pointer"
                                        onClick={() =>
                                            handleTransfer(payment.evidence)
                                        }
                                    >
                                        <img
                                            src={payment.evidence}
                                            alt="bukti transfer"
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </td>
                                    <td>
                                        {payment.booktransactions.map(
                                            (book, index) => (
                                                <span
                                                    className="text-sm capitalize"
                                                    key={index}
                                                >
                                                    {book.title}
                                                    {payment.booktransactions
                                                        .length !==
                                                        index + 1 && <>, </>}
                                                </span>
                                            )
                                        )}
                                    </td>
                                    <td>
                                        {moment(payment.createdAt).format(
                                            "DD-MMMM-YYYY"
                                        )}
                                    </td>
                                    <td>{rupiah(payment.total)}</td>
                                </tr>
                            ))
                        ) : (
                            <p>Data not found</p>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-5 mb-14">
                <button
                    className={`rounded bg-gray-300 px-2 py-1 mr-2 ${
                        canPreviousPage
                            ? "hover:bg-slate-900 hover:text-white"
                            : "text-gray-400"
                    }`}
                    onClick={() => previousPage()}
                >
                    Previous
                </button>
                <button
                    className={`rounded bg-gray-300 px-2 py-1 mr-2 ${
                        canNextPage
                            ? "hover:bg-slate-900 hover:text-white"
                            : "text-gray-400"
                    }`}
                    onClick={() => nextPage()}
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default PaymentCancel;
