import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";

// Import Swiper styles
import "swiper/css";

import "./index.css";

// import required modules
import { Autoplay } from "swiper";
import Buttons from "components/atoms/Buttons";

// state global
import { cartStore } from "store/cartSlice";
import { authStore } from "store/authSlice";

function Hero({dataBooks}) {
    const { statusAuth } = useSelector((state) => state.authModal);
    const dispatch = useDispatch();


    const handleAddCart = (book) => {
        if (statusAuth) {
            dispatch(
                cartStore({
                    cart: {
                        id : book.id,
                        title : book.title,
                        image : book.image,
                        author : book.author,
                        publication : book.publication,
                        price : book.price,
                    }
                })
            );
        }else {
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
            <div className="xxl:container mx-auto mt-28 mb-20">
                <h1 className="font-tinos text-4xl lg:text-5xl text-center mx-auto max-w-[780px]">
                    With us, you can shop online & help save your high street at
                    the same time
                </h1>
            </div>
            <div className="wrapper-slider">
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
                    {
                        dataBooks?.data?.length > 0 && (
                        dataBooks?.data?.map(book => (
                            
                            <SwiperSlide key={book.id} >
                                <img
                                    src={book.image}
                                    alt="image-book"
                                />
                                <div className="px-7 py-4 bg-white text-left">
                                    <h6 className="text-2xl font-bold font-tinos truncate-3">
                                        {book.title}
                                    </h6>
                                    <p className="italic text-sm text-[#929292]">
                                        {book.author}
                                    </p>
                                    <p className="text-sm mt-4 mb-9 truncate-3">
                                        {book.short_desc}
                                    </p>
                                    <p className="text-[#44B300] font-bold text-lg mb-3.5">
                                        {book.price}
                                    </p>
                                    <Buttons
                                        className="mt-3 block border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full text-center text-white hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500"
                                        onClick={() => handleAddCart(book)}
                                    >
                                        Add To Cart
                                    </Buttons>
                                </div>
                            </SwiperSlide>
                        ))
                        )
                    }
                    
                </Swiper>
            </div>
        </>
    );
}

export default Hero;
