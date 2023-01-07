import React, {useState} from 'react'
import { useAsyncDebounce } from 'react-table'

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)
//   const onChange = useAsyncDebounce(value => {
//     setFilter(value || undefined)
//   }, 1000)
console.log('filter', filter)
  return (
    <p className='my-4'>
      {/* Search:{' '} */}
      <input
        value={filter || ''}
        placeholder="search"
        className=' m-2 py-3 px-3 bg-[#BCBCBC] bg-opacity-25 border-[#BCBCBC] w-full lg:w-3/12 xl:w-2/12 block rounded text-black focus:outline-none focus:ring-1 focus:ring-slate-600 shadow'
        onChange={e => {
            setFilter(e.target.value)
        //   setValue(e.target.value);
        //   onChange(e.target.value);
        }}
      />
    </p>
  )
}