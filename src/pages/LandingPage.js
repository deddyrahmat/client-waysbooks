import React from 'react'

// component
import HeaderLanding from 'components/organisms/HeaderLanding'
import ListBooks from 'components/organisms/ListBooks'

// dummy data
import dataBooks  from '../dummy/listbook.json'

function LandingPage() {
  return (
    <div className='bg-[#F3F3F3] pb-9'>
        <HeaderLanding dataBooks={dataBooks} />
        <ListBooks dataBooks={dataBooks} />
    </div>
  )
}

export default LandingPage