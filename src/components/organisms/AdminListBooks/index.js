import React, {useState, useEffect} from 'react'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import moment from 'moment'
import idLocale from 'moment/locale/id';

// component
import Modal from 'components/atoms/Modal';

// utils
import {rupiah} from '../../../utils/FormatCurrency';

// styling
import './adminListBook.css'
import Buttons from 'components/atoms/Buttons';
import { GlobalFilter } from 'components/molecules/GlobalFilter.js';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize,globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre> */}
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination mt-5">
        <button className={`rounded bg-gray-300 px-2 py-1 mr-2 ${canPreviousPage ? "hover:bg-white" : "text-gray-400"}`} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button className={`rounded bg-gray-300 px-2 py-1 mr-2 ${canPreviousPage ? "hover:bg-white" : "text-gray-400"}`} onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'Previous'}
        </button>{' '}
        <button className={`rounded bg-gray-300 px-2 py-1 mr-2 ${canNextPage ? "hover:bg-white" : "text-gray-400"}`} onClick={() => nextPage()} disabled={!canNextPage}>
          {'Next'}
        </button>{' '}
        <button className={`rounded bg-gray-300 px-2 py-1 mr-2 ${canNextPage ? "hover:bg-white" : "text-gray-400"}`} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        {/* <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '} */}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

function AdminListBooks({list}) {
  moment.locale('id', idLocale);


   // handle preview image payment in modal popup
   const [imageTransfer, setImageTransfer] = useState('');

   const [previewImage, setPreviewImage] = useState(false);
   const handlePreview = () => {
     setPreviewImage(!previewImage);
   }

  const handleTransfer = (value) => {
    setImageTransfer(value);
    setPreviewImage(true);
  } 

  // const handleAction = (value) => {
  //   console.log('value', value)
  // } 

  const columns = React.useMemo(
    () => [
        {
          Header: 'No',
          accessor: 'no',
          Cell: s => (
            <span  className="text-sm">
              {s.value} 
            </span>
          ),
        },
        {
            Header: 'User',
            accessor: 'name',
            Cell: s => (
              <span  className="text-sm capitalize">
                {s.value} 
              </span>
            ),
        },
        {
            Header: 'Evidence of Transfer',
            accessor: 'transfer',
            Cell: s => (
              <div className='w-[40px] h-[40px] mx-auto cursor-pointer' onClick={() => handleTransfer(s.value)}>
                <img src={s.value} alt='bukti transfer' className='h-full w-full object-cover object-center' />
              </div>
            ),
        },
        {
            Header: 'Product Purchased',
            accessor: 'product',
            Cell: s => (
              <span  className="text-sm capitalize">
                {s.value} 
              </span>
            ),
        },
        {
            Header: 'Date Transaction',
            accessor: 'date_transaction',
            Cell: s => (
              <span  className="text-sm capitalize">
                {moment(s.value).format('DD-MMMM-YYYY')} 
              </span>
            ),
        },
        {
            Header: 'Total Payment',
            accessor: 'total',
            Cell: s => {
              // console.log(s.row.original.name);
              return (
                <span  className={s.row.original.status === "approved" ? "text-[#0ACF83] text-sm" : "text-[#FF0742] text-sm"}>
                  {rupiah(s.value)} 
                </span>
            )
            },
        },
        {
            Header: 'Status Payment',
            accessor: 'status',
            Cell: s => (
                <span  className={`capitalize text-sm ${s.value === 'approved' ? "text-[#0ACF83]" : s.value === 'cancel' ? "text-[#FF0742]" : "text-[#F7941E]"}`}>
                  {s.value} 
                </span>
            ),
        },
        {
            Header: "Action",
    
            Cell: (tableProps) => (
              <div className='flex space-x-3 items-center'>
                <div
                  className='cursor-pointer'
                  // onClick={() => {
                  //   handleAction(tableProps.row.original)
                  // }}
                >
                  <MdModeEditOutline size={20} color="blue" />
                </div>
                <div
                  className='cursor-pointer'
                  // onClick={() => {
                  //   handleAction(tableProps.row.original)
                  // }}
                >
                  <FaTrashAlt size={20} color="red" />
                </div>
              </div>
            )
          }
    ],
    []
  )

  return (
        <div className="container mx-auto my-10 px-5 sm:px-20">
            <Modal open={previewImage} handleProps={() => handlePreview()}>
              <div className="h-1/2 w-1/2 mx-auto mt-5 mb-3 cursor-pointer">
                <img src={imageTransfer} alt="bukti transfer" className='object-cover object-center w-full h-full'></img>
              </div>
            </Modal>
            <h6 className='font-bold text-xl sm:text-4xl mb-6 font-tinos'>Data Books</h6>
            <Buttons
                className="border-2 border-[#393939] bg-[#393939] rounded py-1.5 px-2 w-full min-w-[100px] text-center text-white hover:text-black hover:bg-white active:bg-white focus:outline-none focus:ring focus:ring-white z-10 mb-5"
                type="link"
                href='/admin/add-book'
            >
                Add Book
            </Buttons>
            <div className="overflow-scroll lg:overflow-auto">
                <Table columns={columns} data={list} />
            </div>
        </div>
  )
}

export default AdminListBooks
