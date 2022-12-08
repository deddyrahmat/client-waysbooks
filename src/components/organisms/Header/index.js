import Navbar  from 'components/molecules/Navbar';
import Hero from 'components/molecules/Hero'
import React from 'react'

import './index.css';

function Header() {
  return (
    <header>
        <Navbar />
        <Hero />
      <img src="assets/images/illustration.png" alt="illustration" className='img-illustration-1' />
      <img src="assets/images/illustration.png" alt="illustration" className='img-illustration-2' />
    </header>
  )
}

export default Header