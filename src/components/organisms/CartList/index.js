import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { rupiah } from "../../../utils/FormatCurrency";
import { MdArrowBackIosNew } from "react-icons/md";

import {  cartRemove, cartReset } from "store/cartSlice";
import Buttons from "components/atoms/Buttons";
import Modal from "components/atoms/Modal";

import ApiTransaction from 'config/Endpoint/transaction'
import LoadingAnimate from './../../atoms/LoadingAnimate/index';

function CartList() {
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSuccess = () => {
        setSuccess(!success);
    };

    const { cart } = useSelector((state) => state.cartReducer);

    // get total price
    let initialValue = 0;
    const total = cart
        .map((item) => {
            return item.price;
        })
        .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue
        );

    // const dispatch = useDispatch();

    const handleRemoveCart = (id) => {
        dispatch(cartRemove({ id }));

        // setSuccess(true);
    };

    // handle preview image payment in modal popup
    const [previewImage, setPreviewImage] = useState(false);
    const handlePreview = () => {
        setPreviewImage(!previewImage);
    };

    // handle upload image payment
    const [image, setImage] = useState({ preview: "", raw: "" });
    const handleImageTransaction = (e) => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }

        // console.log(" e.target.files image",  e.target.files[0].type);
    };
    // image book
    // ==============================================================
    const handlePayment = async () => {
        setIsLoading(true);
        if (image.raw === "") {
        } else {
            try {
                const config = {
                    headers: {
                        "content-type": "multipart/form-data",
                    }
                }
    
                let books = [];
                cart.map(cart =>
                    {
                        books.push(cart.id)
                    }
                )
    
                const body = new FormData();
    
                body.append("total", total);
                body.append("evidence", image.raw);
                body.append("books",  JSON.stringify(books));
    
                // eksekusi api dengan mengirim body dan config
                const response = await ApiTransaction.upload( body, config);
                if (response.status === 1) {
                    setSuccess(true);
                    setIsLoading(false);
                    dispatch(cartReset());
                }
            } catch (error) {
                console.log('Your System ', error)
                setIsLoading(false)
            }
            
        }
    }
    return (
        <>
            <Modal open={success} handleProps={() => handleSuccess()}>
                <p className="text-2xl text-[#469F74]">
                    Thank you for ordering in us, please wait 1 x 24 hours to
                    verify you order
                </p>
            </Modal>
            <div className="mt-20">
                <div className="xs:container xxl:container mx-auto px-10 pb-14">
                    <h6 className="font-bold text-4xl font-tinos mb-10">
                        My Cart
                    </h6>

                    {cart.length > 0 ? (
                        <>
                            <p className="text-lg mb-3">Review Your Order</p>
                            <div className="flex flex-col lg:flex-row lg:space-x-10 items-start">
                                <div className="w-full lg:w-[60%]">
                                    <hr className="w-full border-[1px] border-black mb-8" />
                                    {cart.length > 0 &&
                                        cart.map((item) => (
                                            <div
                                                className="flex flex-col sm:flex-row justify-between items-start mb-10 pb-3 border-b-4 sm:border-0"
                                                key={item.id}
                                            >
                                                <div className="flex flex-col sm:flex-row items-start justify-between space-x-3 w-5/6">
                                                    <div className="h-[175px] w-[140px] mx-auto sm:mx-0 mb-3 sm:mb-0">
                                                        <img
                                                            src={item.thumbnail}
                                                            alt={item.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="text-start w-5/6">
                                                        <h6 className="text-2xl font-bold font-tinos truncate-2">
                                                            {item.title}
                                                        </h6>
                                                        <p className="italic text-sm text-[#929292] mt-2.5 mb-5">
                                                            {item.author}
                                                        </p>
                                                        <p className="text-[#44B300] font-bold text-lg">
                                                            {rupiah(item.price)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <FaTrashAlt
                                                    size={20}
                                                    className="cursor-pointer mx-auto mt-5 sm:mx-0 sm:mt-0"
                                                    onClick={() =>
                                                        handleRemoveCart(
                                                            item.id
                                                        )
                                                    }
                                                />
                                            </div>
                                        ))}
                                    <hr className="w-full border-[1px] border-black mb-8" />
                                </div>

                                <div className="w-full lg:w-[40%]">
                                    <hr className="w-full border-[1px] border-black mb-2" />
                                    <div className="flex justify-between mb-2">
                                        <p>Subtotal</p>
                                        <p>{rupiah(total)}</p>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <p>Qty</p>
                                        <p>{cart.length}</p>
                                    </div>
                                    <hr className="w-full border-[1px] border-black mb-3" />
                                    <div className="flex justify-between mb-11">
                                        <p className="text-[#44B300] font-bold text-lg">
                                            Total
                                        </p>
                                        <p className="text-[#44B300] font-bold text-lg">
                                            {rupiah(total)}
                                        </p>
                                    </div>
                                    <div className="float-right">
                                        <label htmlFor="payment">
                                            <div className="w-[260px] h-[150px]">
                                                <img
                                                    src="/assets/images/payment.jpg"
                                                    alt="payment-icon"
                                                    className="object-cover object-center w-full h-full cursor-pointer"
                                                />
                                            </div>
                                        </label>
                                        <input
                                            type="file"
                                            name="payment"
                                            id="payment"
                                            className="hidden"
                                            onChange={handleImageTransaction}
                                        />

                                        {image.preview && (
                                            <>
                                                <div
                                                    className="h-[80px] w-[80px] mt-5 mb-1 cursor-pointer"
                                                    onClick={() =>
                                                        handlePreview()
                                                    }
                                                >
                                                    <img
                                                        src={image.preview}
                                                        alt="Book"
                                                        className="object-cover object-center w-full h-full"
                                                        onChange={
                                                            handleImageTransaction
                                                        }
                                                    ></img>
                                                </div>
                                                <p className="text-sm mb-3">
                                                    Click to Show Preview
                                                </p>
                                                <Modal
                                                    open={previewImage}
                                                    handleProps={() =>
                                                        handlePreview()
                                                    }
                                                >
                                                    <div className="h-1/2 w-1/2 mx-auto mt-5 mb-3 cursor-pointer">
                                                        <img
                                                            src={image.preview}
                                                            alt="Book"
                                                            className="object-cover object-center w-full h-full"
                                                            onChange={
                                                                handleImageTransaction
                                                            }
                                                        ></img>
                                                    </div>
                                                </Modal>
                                            </>
                                        )}
                                        <Buttons onClick={() => handlePayment()} className={`border-2 border-[#393939] rounded py-1.5 w-full min-w-[100px] text-center text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white mt-5 ${isLoading ? 'pointer-events-none bg-slate-500' : 'bg-[#393939]'}`}>
                                            {isLoading ? (<LoadingAnimate />) : "Pay"}
                                        </Buttons>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h6 className="font-bold text-3xl font-tinos text-red-900 mb-3">
                                Cart Empty
                            </h6>
                            <Buttons
                                type="link"
                                href="/"
                                className="mt-3 block border-2 border-[#393939] bg-[#393939] rounded py-1.5 w-full md:w-2/12 text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white flex items-center justify-center space-x-1"
                            >
                                <MdArrowBackIosNew size={20} />
                                <p>Back to Home</p>
                            </Buttons>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default CartList;
