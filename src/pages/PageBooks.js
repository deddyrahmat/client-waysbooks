import React, {useState, useEffect} from 'react'

// component
import Header from 'components/organisms/Header'
import AllBooks from 'components/organisms/AllBooks';

function PageBooks() {
  const [isLoading, setIsLoading] = useState(false);
  const [findBook,setFindBook] = useState([]);

  return (
    <>
        <Header />
        <AllBooks />
    </>
  )
}

export default PageBooks