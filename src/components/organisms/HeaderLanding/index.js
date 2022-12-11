import Navbar  from 'components/molecules/Navbar';
import Hero from 'components/molecules/Hero'
import React from 'react'

import './index.css';

function HeaderLanding({dataBooks}) {
  return (
    <header className='landing'>
        <Navbar />
        <Hero dataBooks={dataBooks} />
      <img src="/assets/images/illustration.png" alt="illustration" className='img-illustration-1' />
      <img src="/assets/images/illustration.png" alt="illustration" className='img-illustration-2' />
    </header>
  )
}

export default HeaderLanding