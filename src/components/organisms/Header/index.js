import React from 'react'

// component
import Navbar  from 'components/molecules/Navbar';

// style
import './index.css';

function Header() {
  return (
    <header className='relative'>
      <img src="/assets/images/illustration.png" alt="illustration" className='img-illustration-3' />
      <img src="/assets/images/illustration.png" alt="illustration" className='img-illustration-4' />
        <Navbar />
    </header>
  )
}

export default Header