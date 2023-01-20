import React, { useState } from "react";
import parse from "html-react-parser";
import { MdShoppingBasket } from "react-icons/md";
import { useDispatch } from "react-redux";

// component
import Buttons from "components/atoms/Buttons";
import Modal from "components/atoms/Modal";

// utils
import { rupiah } from "../../../utils/FormatCurrency";

// state global
import { cartStore } from "store/cartSlice";

// config
import ApiBook from "config/Endpoint/book";

function DataBook({ data }) {
    // console.log('data', data)

    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [buy, setBuy] = useState(false);

    const handleBuy = () => {
        setBuy(!buy);
    };

    const dispatch = useDispatch();

    const handleAddCart = async () => {
        // console.log("data", data);
        setIsLoading(true);
        try {
            const response = await ApiBook.bookUser();

            if (response.status === 1) {
                // setPaymentPending(response.data);
                if (response.data.length > 0) {
                    const bookPurchased = response.data.filter(
                        (book) => book === data.id
                    );
                    // console.log("bookPurchased", bookPurchased);
                    if (bookPurchased.length === 0) {
                        dispatch(
                            cartStore({
                                cart: {
                                    id: data.id,
                                    title: data.title,
                                    thumbnail: data.thumbnail,
                                    author: data.author,
                                    publication: data.publication,
                                    price: data.price,
                                },
                            })
                        );

                        setSuccess(true);
                    } else {
                        setBuy(true);
                    }
                }

                setIsLoading(false);
            }
        } catch (error) {
            console.log("Your System ", error);
            setIsLoading(false);
        }
    };

    const handleSuccess = () => {
        setSuccess(!success);
    };

    return (
        <>
            <Modal open={success} handleProps={() => handleSuccess()}>
                <p className="text-lg lg:text-2xl text-[#469F74]">
                    The product is successfully added to the cart
                </p>
            </Modal>
            <Modal open={buy} handleProps={() => handleBuy()}>
                <p className="text-lg lg:text-2xl text-amber-600">
                    You have purchased this book
                </p>
            </Modal>
            <div className="max-w-[905px] mx-auto mt-12 px-3 grid grid-cols-1 lg:grid-cols-2 gap-8 justify-between items-start mb-10 lg:mb-20">
                <div className="h-[577px] w-full bg-white">
                    <img
                        src={data.thumbnail}
                        alt="cover"
                        className="rounded-lg h-full w-full object-contain lg:object-cover object-center"
                    />
                </div>
                <div className="text-start">
                    <h1 className="font-bold text-2xl lg:text-5xl font-tinos">
                        {data.title}
                    </h1>
                    <p className="italic text-sm lg:text-2xl text-[#929292] mb-6 lg:mb-14">
                        {data.author}
                    </p>
                    <p className="font-bold text-sm lg:text-2xl ">
                        Publication Date
                    </p>
                    <p className="text-sm lg:text-2xl text-[#929292] mb-6 lg:mb-14">
                        {data.publication}
                    </p>
                    <p className="font-bold text-sm lg:text-2xl ">Pages</p>
                    <p className="text-sm lg:text-2xl text-[#929292] mb-6 lg:mb-14">
                        {data.pages}
                    </p>
                    <p className="font-bold text-sm lg:text-2xl text-[#D60000]">
                        ISBN
                    </p>
                    <p className="text-sm lg:text-2xl text-[#929292] mb-6 lg:mb-14">
                        {data.isbn}
                    </p>
                    <p className="font-bold text-sm lg:text-2xl ">Price</p>
                    <p className="text-sm lg:text-2xl text-[#44B200]">
                        {rupiah(data.price)}
                    </p>
                </div>
            </div>
            <div className="max-w-[905px] mx-auto px-3">
                <h6 className="font-bold text-4xl mb-6">About This Book</h6>
                {parse(String(data.detail))}
                <Buttons
                    className="float-right my-9 border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-36 min-w-[100px] text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white flex justify-center items-center space-x-3"
                    onClick={() => handleAddCart()}
                >
                    <span>Add Cart</span>
                    <MdShoppingBasket size={23} />
                </Buttons>
            </div>
        </>
    );
}

export default DataBook;
