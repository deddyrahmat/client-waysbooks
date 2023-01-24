import React, {useEffect, useState} from 'react'

// component
import HeaderLanding from 'components/organisms/HeaderLanding'
import ListBooks from 'components/organisms/ListBooks'
import LoadingScreen from 'components/atoms/LoadingScreen';

function LandingPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 1000);
  // },[]);
  // console.log('dataBooks', dataBooks)

  return (
    <>
    {
      isLoading ? (<LoadingScreen />) : (
        <div className='bg-[#F3F3F3] pb-9'>
          <HeaderLanding />
          <ListBooks />
        </div>
      )
    }
    </>
  )
}

export default LandingPage