import React, {useState, useEffect} from 'react'

// component
import Header from 'components/organisms/Header'
import AllBooks from 'components/organisms/AllBooks';

function Books() {
  const [isLoading, setIsLoading] = useState(false);
  const [findBook,setFindBook] = useState([]);

  return (
    <>
        <Header />
        <AllBooks />
    </>
  )
}

export default Books