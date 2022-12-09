import React from 'react'
import parse from 'html-react-parser';
import { MdShoppingBasket } from "react-icons/md";
import { useDispatch } from "react-redux";

// component
import Buttons from 'components/atoms/Buttons';

// utils
import {rupiah} from '../../../utils/FormatCurrency';

// state global
import { cartStore } from "store/cartSlice";

function DataBook({data}) {

    const dispatch = useDispatch();

    const handleAddCart = () => {
        dispatch(
            cartStore({
                cart: {
                    id : data.id,
                    title : data.title,
                    image : data.image,
                    publication : data.publication,
                    price : data.price,
                }
            })
        );
    };

  return (
    <>
        <div className="max-w-[905px] mx-auto mt-12 px-3 grid grid-cols-1 lg:grid-cols-2 gap-8 justify-between items-start mb-10 lg:mb-20">
          <div className="h-[577px] w-full bg-white">
            <img src={data.image} alt="cover" className='rounded-lg h-full w-full object-cover object-center' />
          </div>
          <div className="text-start">
            <h1 className='font-bold text-2xl lg:text-5xl font-tinos'>{data.title}</h1>
            <p className='italic text-sm lg:text-2xl text-[#929292] mb-6 lg:mb-14'>{data.author}</p>
            <p className='font-bold text-sm lg:text-2xl '>Publication Date</p>
            <p className='text-sm lg:text-2xl text-[#929292] mb-6 lg:mb-14'>{data.publication}</p>
            <p className='font-bold text-sm lg:text-2xl '>Pages</p>
            <p className='text-sm lg:text-2xl text-[#929292] mb-6 lg:mb-14'>{data.pages}</p>
            <p className='font-bold text-sm lg:text-2xl text-[#D60000]'>ISBN</p>
            <p className='text-sm lg:text-2xl text-[#929292] mb-6 lg:mb-14'>{data.isbn}</p>
            <p className='font-bold text-sm lg:text-2xl '>Price</p>
            <p className='text-sm lg:text-2xl text-[#44B200]'>{rupiah(data.price)}</p>
          </div>
        </div>
        <div className="max-w-[905px] mx-auto px-3">
          <h6 className='font-bold text-4xl mb-6'>About This Book</h6>
          {parse(data.detail)}
          <Buttons className='float-right my-9 border-2 border-[#393939] bg-[#393939] rounded-sm py-1.5 w-36 min-w-[100px] text-white hover:bg-gray-500 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-500 flex justify-center items-center space-x-3' onClick={() => handleAddCart()}>
            <span>Add Cart</span>
            <MdShoppingBasket size={23} />
          </Buttons>
        </div>
    </>
  )
}

export default DataBook