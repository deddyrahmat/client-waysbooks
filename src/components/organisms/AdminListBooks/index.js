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
import "./adminListBook.css";

// config
import ApiTransaction from 'config/Endpoint/book';
import Tables from "components/molecules/Tables";
import Buttons from "components/atoms/Buttons";

const AdminListBooks = memo(() => {
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
                Header: "Title",
                accessor: "title",
                Cell: (s) => (
                    <span className="text-sm capitalize">{s.value}</span>
                ),
            },
            {
                Header: "Thumbnail",
                accessor: "thumbnail",
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
                Header: "Price",
                accessor: "price",
                Cell: (s) => (
                    <span className="text-sm capitalize">{rupiah(s.value)}</span>
                ),
            },
            {
                Header: "Author",
                accessor: "author",
                Cell: (s) => (
                    <span className="text-sm capitalize">{s.value}</span>
                ),
            },
            {
                Header: "Publish",
                accessor: "publication",
                Cell: (s) => (
                    <span className="text-sm capitalize">
                        {moment(s.value).format("DD-MMMM-YYYY")}
                    </span>
                ),
            },
            {
                Header: "ISBN",
                accessor: "isbn",
                Cell: (s) => (
                    <span className="text-sm capitalize">
                        {s.value === '' ? '- - -' : s.value}
                    </span>
                ),
            },
            // {
            //     Header: "Action",

            //     Cell: (tableProps) => (
            //         <div className="flex space-x-3 items-center">
            //             <div
            //                 className="cursor-pointer"
            //                 onClick={() => {
            //                   handleAction(tableProps.row.original)
            //                 }}
            //             >
            //                 <MdArrowDropDown size={25} color="blue" />
            //             </div>
            //         </div>
            //     ),
            // },
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
                List Books
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

export default AdminListBooks;
