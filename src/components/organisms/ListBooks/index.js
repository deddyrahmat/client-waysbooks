import Books from 'components/molecules/Books'
import React from 'react'

function ListBooks() {
  return (
    <div className="mt-40">
        <div className="xxl:container mx-auto pb-14">
            <h6 className='font-bold font-tinos text-4xl mb-10'>List Book</h6>
            <div className="grid grid-cols-5 gap-16">
                <Books />
                <Books />
                <Books />
                <Books />
                <Books />
            </div>
        </div>
    </div>
  )
}

export default ListBooks