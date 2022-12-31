import React from 'react'
import { ImSpinner9 } from "react-icons/im";

function LoadingScreen() {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
            <ImSpinner9 size={40} className="animate-spin transition ease-in-out" />
    </div>
  )
}

export default LoadingScreen