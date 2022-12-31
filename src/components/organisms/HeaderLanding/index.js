import Navbar  from 'components/molecules/Navbar';
import Hero from 'components/molecules/Hero'
import React from 'react'

import './index.css';

function HeaderLanding() {
  return (
    <header className='landing'>
        <Navbar />
        <div className="xxl:container mx-auto mt-28 mb-20">
            <h1 className="font-tinos text-4xl lg:text-5xl text-center mx-auto max-w-[780px]">
                With us, you can shop online & help save your high street at
                the same time
            </h1>
        </div>
        <Hero />
      <img src="/assets/images/illustration.png" alt="illustration" className='img-illustration-1' />
      <img src="/assets/images/illustration.png" alt="illustration" className='img-illustration-2' />
    </header>
  )
}

export default HeaderLanding