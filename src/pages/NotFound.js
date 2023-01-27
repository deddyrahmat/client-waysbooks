import React from 'react';
import { FaChevronLeft } from "react-icons/fa";

import Buttons from 'components/atoms/Buttons';

function NotFound() {
  return (
    <div className='h-screen w-screen flex items-center justify-center flex-col'>
        <div className="w-5/12 h-5/12">
            <img src="/assets/images/404.png" alt="not found" className='w-full h-full' />
        </div>
        <Buttons type="link" href="/" className="border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-4/12 sm:w-3/12 lg:w-1/12 rounded-lg text-center text-white hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500 z-10">
        <div className="flex justify-center items-center space-x-2">
            <FaChevronLeft size={15} />
            <p>Back</p>
        </div>
        </Buttons>
    </div>
  )
}

export default NotFound