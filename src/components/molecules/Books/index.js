import React, { useState } from 'react';
import Buttons from 'components/atoms/Buttons'

function Books() {
    const [redirect, setRedirect] = useState(false);

  return (
    <Buttons href={`${redirect ? '/' : ''}`} type="link">
        <img src="https://images.unsplash.com/photo-1603831126198-a53fd2a50da5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" alt="cover-book" className='w-full h-[270px]  object-cover object-center' />
        <h6 className="text-2xl font-bold font-tinos">Sebuah Seni Bersikap Bodoh Amat</h6>
        <p className="italic text-sm text-[#929292] mt-2.5 mb-5">By. Mark Manson</p>
        <p className="text-[#44B300] font-bold text-lg">Rp. 59.000</p>
    </Buttons>
  )
}

export default Books