import React from 'react'

// component
import Header from 'components/organisms/Header'
import DataProfile from 'components/organisms/DataProfile'

// dummy data
import purchaseBooks  from '../dummy/purchasebook.json'

function Profile() {

  return (
    <>
        <Header />
        <DataProfile purchaseBooks={purchaseBooks} />
    </>
  )
}

export default Profile