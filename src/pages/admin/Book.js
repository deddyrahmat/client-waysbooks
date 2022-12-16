import React from 'react'
import { faker } from '@faker-js/faker';

// component
import Header from 'components/organisms/Header'
import AdminListBooks from 'components/organisms/AdminListBooks';

function Book() {
  const data = [];
  for (let item = 0; item < 100 ; item++) {
    data.push({
      no : item+1,
      uuid : faker.datatype.uuid(),
      name : faker.name.fullName(),
      transfer : 'https://images.unsplash.com/photo-1597338770339-9860acd8406e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      product : 'My Own Private Mr. Cool, Sebuah Seni untuk Bersikap Bodo Amat',
      total : 300000,
      date_transaction : '2022-12-15 07:10:58',
      status : 'approved',
      action : 'action',
    })
  }

  // console.log('data', data)

  return (
    <>
        <Header />
        <AdminListBooks list={data} />
    </>
  )
}

export default Book