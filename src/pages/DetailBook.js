import React from 'react'
import {  useParams } from 'react-router-dom';

// component
import Header from 'components/organisms/Header'
import DataBook from 'components/organisms/DataBook';

// dummy data
import dataBooks  from '../dummy/listbook.json'


function DetailBook() {
  const params = useParams();

  const findBook = dataBooks.data.find(book => book.slug === params.slug);
  return (
    <>
        <Header />
        <DataBook data={findBook} />
    </>
  )
}

export default DetailBook