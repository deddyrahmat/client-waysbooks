import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "./index.css";

// import required modules
import { Autoplay } from "swiper";
import Buttons from "components/atoms/Buttons";

function Hero() {
  return (
    <>
        <div className='xxl:container mx-auto mt-28 mb-20'>
            <h1 className='font-tinos text-5xl text-center mx-auto max-w-[780px]'>With us, you can shop online & help save your high street at the same time</h1>
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
            modules={[Autoplay]}
            className="mySwiper"
        >
            <SwiperSlide>
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="image"  />
                <div className="px-7 py-4 bg-white text-left">
                    <h6 className="text-2xl font-bold font-tinos">Sebuah Seni Bersikap Bodoh Amat</h6>
                    <p className="italic text-sm text-[#929292]">By. Mark Manson</p>
                    <p className="text-sm mt-4 mb-9">Dua insan manusia harus terjebak dalam dilema cinta yang memaksa salah satu dari mereka pergi mencari rezeki</p>
                    <p className="text-[#44B300] font-bold text-lg mb-3.5">Rp. 59.000</p>
                    <Buttons className='mt-3 block border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full text-center text-white hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500' type='link' href=''>Add To Cart</Buttons>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="image"  />
                <div className="px-7 py-4 bg-white text-left">
                    <h6 className="text-2xl font-bold font-tinos">Sebuah Seni Bersikap Bodoh Amat</h6>
                    <p className="italic text-sm text-[#929292]">By. Mark Manson</p>
                    <p className="text-sm mt-4 mb-9">Dua insan manusia harus terjebak dalam dilema cinta yang memaksa salah satu dari mereka pergi mencari rezeki</p>
                    <p className="text-[#44B300] font-bold text-lg mb-3.5">Rp. 59.000</p>
                    <Buttons className='mt-3 block border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full text-center text-white hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500' type='link' href=''>Add To Cart</Buttons>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="image"  />
                <div className="px-7 py-4 bg-white text-left">
                    <h6 className="text-2xl font-bold font-tinos">Sebuah Seni Bersikap Bodoh Amat</h6>
                    <p className="italic text-sm text-[#929292]">By. Mark Manson</p>
                    <p className="text-sm mt-4 mb-9">Dua insan manusia harus terjebak dalam dilema cinta yang memaksa salah satu dari mereka pergi mencari rezeki</p>
                    <p className="text-[#44B300] font-bold text-lg mb-3.5">Rp. 59.000</p>
                    <Buttons className='mt-3 block border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full text-center text-white hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500' type='link' href=''>Add To Cart</Buttons>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://images.unsplash.com/photo-1670364272583-c650374bf379?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" alt="image"  />
                <div className="px-7 py-4 bg-white text-left">
                    <h6 className="text-2xl font-bold font-tinos">Sebuah Seni Bersikap Bodoh Amat</h6>
                    <p className="italic text-sm text-[#929292]">By. Mark Manson</p>
                    <p className="text-sm mt-4 mb-9">Dua insan manusia harus terjebak dalam dilema cinta yang memaksa salah satu dari mereka pergi mencari rezeki</p>
                    <p className="text-[#44B300] font-bold text-lg mb-3.5">Rp. 59.000</p>
                    <Buttons className='mt-3 block border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full text-center text-white hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500' type='link' href=''>Add To Cart</Buttons>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="image"  />
                <div className="px-7 py-4 bg-white text-left">
                    <h6 className="text-2xl font-bold font-tinos">Sebuah Seni Bersikap Bodoh Amat</h6>
                    <p className="italic text-sm text-[#929292]">By. Mark Manson</p>
                    <p className="text-sm mt-4 mb-9">Dua insan manusia harus terjebak dalam dilema cinta yang memaksa salah satu dari mereka pergi mencari rezeki</p>
                    <p className="text-[#44B300] font-bold text-lg mb-3.5">Rp. 59.000</p>
                    <Buttons className='mt-3 block border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full text-center text-white hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500' type='link' href=''>Add To Cart</Buttons>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="image"  />
                <div className="px-7 py-4 bg-white text-left">
                    <h6 className="text-2xl font-bold font-tinos">Sebuah Seni Bersikap Bodoh Amat</h6>
                    <p className="italic text-sm text-[#929292]">By. Mark Manson</p>
                    <p className="text-sm mt-4 mb-9">Dua insan manusia harus terjebak dalam dilema cinta yang memaksa salah satu dari mereka pergi mencari rezeki</p>
                    <p className="text-[#44B300] font-bold text-lg mb-3.5">Rp. 59.000</p>
                    <Buttons className='mt-3 block border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-full text-center text-white hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500' type='link' href=''>Add To Cart</Buttons>
                </div>
            </SwiperSlide>
        </Swiper>
        </div>
    </>
  )
}

export default Hero