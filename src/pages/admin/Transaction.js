import React from 'react'
import { faker } from '@faker-js/faker';

// component
import Header from 'components/organisms/Header'
import ListTransaction from 'components/organisms/ListTransaction'

function Transaction() {

  return (
    <>
        <Header />
        <ListTransaction />
    </>
  )
}

export default Transaction