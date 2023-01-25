import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";

import "./index.css";

// import required modules
import Buttons from "components/atoms/Buttons";
import Modal from "components/atoms/Modal";

// state global
import { cartStore } from "store/cartSlice";
import { authStore } from "store/authSlice";
import { rupiah } from "utils/FormatCurrency";

// config
import ApiBooks from "config/Endpoint/book";
import LoadingAnimate from "components/atoms/LoadingAnimate";

function Hero() {
    const [dataBooks, setDataBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const prosesListBooks = async () => {
        try {
            const response = await ApiBooks.bestSeller();

            if (response.status === 1) {
                setDataBooks(response.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Your System ", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        prosesListBooks();
    }, []);

    // console.log('dataBooks', dataBooks)

    const [success, setSuccess] = useState(false);

    const handleSuccess = () => {
        setSuccess(!success);
    };

    const { statusAuth } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    const [buy, setBuy] = useState(false);

    const handleBuy = () => {
        setBuy(!buy);
    };

    const handleAddCart = async (book) => {
        if (statusAuth) {
            
            setIsLoading(true);
        try {
            // cek api untuk melihat daftar buku yang telah di beli oleh user yang login
            const response = await ApiBooks.bookUser();
            // console.log('response', response)

            if (response.status === 1) {
                // jika sudah ada buku yang dibeli user
                // filter buku yang dipilih user dengan data buku yang ada di database
                if (response.data.length > 0) {
                    const bookPurchased = response.data.filter(
                        (item) => item === book.id
                    );
                    // console.log("bookPurchased", bookPurchased);
                    if (bookPurchased.length === 0) {
                        dispatch(
                            cartStore({
                                cart: {
                                    id: book.id,
                                    title: book.title,
                                    thumbnail: book.thumbnail,
                                    author: book.author,
                                    publication: book.publication,
                                    price: book.price,
                                },
                            })
                        );
            
                        setSuccess(true);
                    } else {
                        setBuy(true);
                    }
                }else{
                    dispatch(
                        cartStore({
                            cart: {
                                id: book.id,
                                title: book.title,
                                image: book.image,
                                author: book.author,
                                publication: book.publication,
                                price: book.price,
                            },
                        })
                    );
        
                    setSuccess(true);
                }

                setIsLoading(false);
            }
        } catch (error) {
            console.log("Your System ", error);
            setIsLoading(false);
        }
            
            
        } else {
            dispatch(
                authStore({
                    login: true,
                    register: false,
                })
            );
        }
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

            <div className="wrapper-slider">
                {isLoading ? (
                    <LoadingAnimate />
                ) : (
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        breakpoints={{
                            360: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1440: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {dataBooks?.length > 0 &&
                            dataBooks?.map((book) => (
                                <SwiperSlide key={book?.book.id}>
                                    <img
                                        src={book?.book.thumbnail}
                                        alt="image-book"
                                    />
                                    <div className="px-7 py-4 bg-white text-left">
                                        <h6 className="text-2xl font-bold font-tinos truncate-3">
                                            {book?.book.title}
                                        </h6>
                                        <p className="italic text-sm text-[#929292]">
                                            {book?.book.author}
                                        </p>
                                        <p className="text-sm mt-4 mb-9 truncate-3">
                                            {book?.book.short_desc}
                                        </p>
                                        <p className="text-[#44B300] font-bold text-lg mb-3.5">
                                            {rupiah(book?.book.price)}
                                        </p>
                                        <Buttons
                                            className="mt-3 block border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full text-center text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white"
                                            onClick={() => handleAddCart(book?.book)}
                                        >
                                            Add To Cart
                                        </Buttons>
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                )}
            </div>
        </>
    );
}

export default Hero;
