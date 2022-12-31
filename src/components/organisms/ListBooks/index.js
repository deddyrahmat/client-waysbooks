import React, {useState, useEffect} from 'react'

// config
import ApiBooks from 'config/Endpoint/book'

// componet
import Books from 'components/molecules/Books'
import LoadingAnimate from "components/atoms/LoadingAnimate";

function ListBooks() {
  const [dataBooks, setDataBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const prosesListBooks = async () => {
    try {
      const response = await ApiBooks.list();
      
      if (response.status === 1) {
        setDataBooks(response.data)
        setIsLoading(false)
      }
    } catch (error) {
      console.log('Your System ', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    prosesListBooks();
  },[])


  return (
    <div className="mt-40">
        <div className="container mx-auto pb-14">
            <h6 className='font-bold font-tinos text-4xl mb-10'>List Book</h6>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-16">
              {
                isLoading ? (<LoadingAnimate />)  : 
                dataBooks?.length > 0 ? (
                  dataBooks?.map(book => (
                    <Books key={book.id} data={book} />
                  ))
                ) : (
                  <p className='text-red-900 text-xl font-bold'>Data Not Found</p>
                )
              }
            </div>
        </div>
    </div>
  )
}

export default ListBooks