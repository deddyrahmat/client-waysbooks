import React from 'react'
import { ImSpinner9 } from "react-icons/im";

function LoadingAnimate() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
            <ImSpinner9 size={40} className="animate-spin transition ease-in-out" />
    </div>
  )
}

export default LoadingAnimate