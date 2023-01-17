import React, {useState, useEffect} from 'react'
import {  useParams } from 'react-router-dom';

// component
import Header from 'components/organisms/Header'
import DataBook from 'components/organisms/DataBook';

import ApiBooks from 'config/Endpoint/book'



function DetailBook() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [findBook,setFindBook] = useState([]);

  // console.log('params.slug', params.slug)
  // const findBook = dataBooks.data.find(book => book.slug === params.slug);
  const prosesFindBook = async () => {
    setIsLoading(true)
    try {
      const response = await ApiBooks.bySlug(params.slug);
      // console.log('response', response)

      if (response.status === 1) {
        setIsLoading(false)
        setFindBook(response.data);
      }
    } catch (error) {
      setIsLoading(false)
      console.log('Your System ', error )
      
    }
  }
  
  useEffect(()=> {
    prosesFindBook()
  },[]);
  return (
    <>
        <Header />
        <DataBook data={findBook} />
    </>
  )
}

export default DetailBook