import Books from 'components/molecules/Books'
import React from 'react'

import dataBooks  from '../../../dummy/listbook.json'

function ListBooks() {
  return (
    <div className="mt-40">
        <div className="container mx-auto pb-14">
            <h6 className='font-bold font-tinos text-4xl mb-10'>List Book</h6>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-16">
              {
                dataBooks.data.length > 0 && (
                  dataBooks?.data?.map(book => (
                    <Books key={book.id} data={book} />
                  ))
                )
              }
            </div>
        </div>
    </div>
  )
}

export default ListBooks