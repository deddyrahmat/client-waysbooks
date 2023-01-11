import React, { useState, useEffect, memo } from "react";
import { MdArrowDropDown } from "react-icons/md";
import moment from "moment";
import idLocale from "moment/locale/id";
import { FaCheckCircle, FaWindowClose } from "react-icons/fa";

// component
import Modal from "components/atoms/Modal";
import LoadingAnimate from "components/atoms/LoadingAnimate";

// utils
import { rupiah } from "../../../utils/FormatCurrency";

// styling
import "./listTransaction.css";

// config
import ApiTransaction from 'config/Endpoint/transaction';
import Tables from "components/molecules/Tables";
import Buttons from "components/atoms/Buttons";

const ListTransaction = memo(() => {
    const [dataTransactions, setDataTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [actionPayment, setActionPayment] = useState(false);
    const [notifPayment, setNotifPayment] = useState(false);
    const [statusNotifPayment, setStatusNotifPayment] = useState('success');
    const [valueAction, setValueAction] = useState([]);
    const [dataBooksId, setDataBooksId] = useState([]);
    const [dataBooksName, setDataBooksName] = useState([]);
    const [statusPayment, setStatusPayment] = useState('pending');
    const pageSizes = [10,20,30,40,50]
    moment.locale("id", idLocale);

    // call api transaction list
    const prosesListTransaction = async () => {
        try {
            const response = await ApiTransaction.list(1,50);

            if (response.status === 1) {
                setDataTransactions(response.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Your System ", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        prosesListTransaction();
    }, []);

    const handleStatusPayment = (e) => {
        setStatusPayment(e.target.value)
    }

    // call api update status payment
    const prosesUpdateTransaction = async () => {
        setIsLoadingPayment(true);
        try {
            const body = JSON.stringify({
                books : dataBooksId,
                status : statusPayment,
                transaction_id : valueAction.id,
                user_id : valueAction.user_id
            });
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };
            const response = await ApiTransaction.changeStatus(body, config);

            if (response.status === 1) {
                setDataTransactions(response.data);
                setStatusNotifPayment("success");
                handleNotifPayment(true);
                setIsLoadingPayment(false);
                handleActionPayment();
                prosesListTransaction();
            }
        } catch (error) {
            console.log("Your System ", error);
            setStatusNotifPayment("failed");
            handleActionPayment();
            setIsLoadingPayment(false);
        }
    };

    // console.log('dataTransactions', dataTransactions)

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

    const handleAction = (value) => {
        //   console.log('value', value)
        setDataBooksId(value.booktransactions.map(book =>
            {
                return book.id
            }
        ))
        setDataBooksName(value.booktransactions.map(book =>
            {
                return book.title
            }
        ))
        setValueAction(value);
        setActionPayment(true);
    }

    // state modal action payment
    const handleActionPayment = () => {
        setActionPayment(!actionPayment);
    }

    const handleNotifPayment = () => {
        setNotifPayment(!notifPayment);
    }

    const columns = React.useMemo(
        () => [
            {
                Header: "User",
                accessor: "user.fullname",
                Cell: (s) => (
                    <span className="text-sm capitalize">{s.value}</span>
                ),
            },
            {
                Header: "Evidence of Transfer",
                accessor: "evidence",
                Cell: (s) => (
                    <div
                        className="w-[40px] h-[40px] mx-auto cursor-pointer"
                        onClick={() => handleTransfer(s.value)}
                    >
                        <img
                            src={s.value}
                            alt="bukti transfer"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                ),
            },
            {
                Header: "Product Purchased",
                accessor: "product",
                Cell: (s) => {
                    return s.row.original.booktransactions.map((book, index) => {
                        return (
                            <span className="text-sm capitalize" key={index}>
                                {book.title}
                                {
                                    s.row.original.booktransactions.length !== index+1 && (
                                        <>, {" "}</>
                                    )
                                }
                            </span>
                        )
                    })
                },
            },
            {
                Header: "Date Transaction",
                accessor: "createdAt",
                Cell: (s) => (
                    <span className="text-sm capitalize">
                        {moment(s.value).format("DD-MMMM-YYYY")}
                    </span>
                ),
            },
            {
                Header: "Total Payment",
                accessor: "total",
                Cell: (s) => {
                    // console.log(s.row.original.name);
                    return (
                        <span
                            className={
                                s.row.original.status === "approved"
                                    ? "text-[#0ACF83] text-sm"
                                    : "text-[#FF0742] text-sm"
                            }
                        >
                            {rupiah(s.value)}
                        </span>
                    );
                },
            },
            {
                Header: "Status Payment",
                accessor: "status",
                Cell: (s) => (
                    <span
                        className={`capitalize text-sm ${
                            s.value === "approved"
                                ? "text-[#0ACF83]"
                                : s.value === "cancel"
                                ? "text-[#FF0742]"
                                : "text-[#F7941E]"
                        }`}
                    >
                        {s.value}
                    </span>
                ),
            },
            {
                Header: "Action",

                Cell: (tableProps) => (
                    <div className="flex space-x-3 items-center">
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                              handleAction(tableProps.row.original)
                            }}
                        >
                            <MdArrowDropDown size={25} color="blue" />
                        </div>
                    </div>
                ),
            },
        ],
        []
    );

    // console.log('dataTransactions', dataTransactions)

    return (
        <div className="container mx-auto my-10 px-5 sm:px-20">
            <Modal open={notifPayment} handleProps={() => handleNotifPayment()}>
                <div className="text-center">
                {
                    statusNotifPayment === 'success' ? (
                    <>
                        <FaCheckCircle size={120} color="green" className="mx-auto" />
                        <p className="mt-3 lg:mt-5 font-semibold text-xl lg:text-3xl">Payment Update Success</p>
                    </>
                    ) : (
                        <>
                            <FaWindowClose size={120} color="red" className="mx-auto" />
                            <p className="mt-3 lg:mt-5 font-semibold text-xl lg:text-3xl">Payment Update Success</p>
                        </>
                    )
                }
                </div>
            </Modal>
            <Modal open={actionPayment} handleProps={() => handleActionPayment()}>
                <div className="w-full mx-auto mt-5 mb-3 cursor-pointer">
                    <p className="font-bold text-xl mb-3">Information Transaction : </p>
                    <p className="text-lg font-semibold">Name : {valueAction?.user?.fullname}</p>
                    <p className="text-lg font-semibold">Total : {valueAction?.total}</p>
                    <p className="text-lg font-semibold mt-3 mb-1">Buy : </p>
                    {dataBooksName.map((book, index) => (
                        <p className="text-lg" key={index} >{book}</p>
                    ))}
                    <p className="font-bold text-xl mt-10 mb-3"> Select status payment: </p>
                    <select name="" id="" className="py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC]  w-full block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600" onChange={(e) => handleStatusPayment(e)}>
                        <option>- - -</option>
                        <option value="approved">Approved</option>
                        <option value="cancel">Cancel</option>
                    </select>
                    <Buttons isLoading={isLoadingPayment} className="mt-5 block border-2 border-[#393939] bg-[#393939] rounded py-1.5 w-full text-center text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white" onClick={() =>prosesUpdateTransaction()}>
                        Update
                    </Buttons>
                </div>
            </Modal>
            <Modal open={previewImage} handleProps={() => handlePreview()}>
                <div className="h-1/2 w-1/2 mx-auto mt-5 mb-3 cursor-pointer">
                    <img
                        src={imageTransfer}
                        alt="bukti transfer"
                        className="object-cover object-center w-full h-full"
                    ></img>
                </div>
            </Modal>
            <h6 className="font-bold text-xl sm:text-4xl mb-6 font-tinos">
                Incoming Transaction
            </h6>
            <div className="overflow-scroll lg:overflow-auto">
            {
                isLoading ? (<LoadingAnimate />): dataTransactions?.length > 0 && (
                            <Tables pageSizes={pageSizes} data={dataTransactions} columns={columns}/>
                        )
            }
            </div>
        </div>
    );
})

export default ListTransaction;
