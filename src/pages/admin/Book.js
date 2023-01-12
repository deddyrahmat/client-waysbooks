import React from 'react'
import { faker } from '@faker-js/faker';

// component
import Header from 'components/organisms/Header'
import AdminListBooks from 'components/organisms/AdminListBooks';

function Book() {

  return (
    <>
        <Header />
        <AdminListBooks />
    </>
  )
}

export default Book