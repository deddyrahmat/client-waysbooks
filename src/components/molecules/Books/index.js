import React from 'react';
import { useDispatch, useSelector } from "react-redux";

// component
import Buttons from 'components/atoms/Buttons'

// state global
import { authStore } from "store/authSlice";

// styling
import './index.css';

// utils
import {rupiah} from '../../../utils/FormatCurrency'

function Books({data}) {
  const { statusAuth } = useSelector((state) => state.authModal);

  const dispatch = useDispatch();

    const handleOpenLogin = () => {
        dispatch(
            authStore({
                login: true,
                register: false,
            })
        );
    };

    const conditonLogin = () => {
      if (!statusAuth) {
        handleOpenLogin();
      }
    }

  return (
    <Buttons href={`${statusAuth ? data.slug : ''}`} onClick={() => conditonLogin()} type="link">
      <div className="bg-white rounded-md p-3">
        <div className="h-[270px] w-full bg-white mb-3">
          <img src={data.image} alt="cover-book" className='w-full h-full object-contain object-center' />
        </div>
          <h6 className="text-2xl font-bold font-tinos truncate-2 min-h-[60px]">{data.title}</h6>
          <p className="italic text-sm text-[#929292] mt-2.5 mb-2">{data.author}</p>
          <p className="text-[#44B300] font-bold text-lg">{rupiah(data.price)}</p>
        </div>
    </Buttons>
  )
}

export default Books