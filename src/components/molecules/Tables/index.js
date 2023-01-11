import React, { memo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { GlobalFilter } from "components/molecules/GlobalFilter.js";

const Tables = memo(({ data, columns, pageSizes }) => {
    // console.log('data', data)
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
        state: { pageIndex, pageSize, globalFilter },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useGlobalFilter,
        usePagination
    );

    // const {globalFilter, pageSize} = state;

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination mt-5">
                <button
                    className={`rounded bg-gray-300 px-2 py-1 mr-2 ${
                        canPreviousPage ? "hover:bg-white" : "text-gray-400"
                    }`}
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                >
                    {"<<"}
                </button>{" "}
                <button
                    className={`rounded bg-gray-300 px-2 py-1 mr-2 ${
                        canPreviousPage ? "hover:bg-white" : "text-gray-400"
                    }`}
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    {"Previous"}
                </button>{" "}
                <button
                    className={`rounded bg-gray-300 px-2 py-1 mr-2 ${
                        canNextPage ? "hover:bg-white" : "text-gray-400"
                    }`}
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                >
                    {"Next"}
                </button>{" "}
                <button
                    className={`rounded bg-gray-300 px-2 py-1 mr-2 ${
                        canNextPage ? "hover:bg-white" : "text-gray-400"
                    }`}
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {">>"}
                </button>{" "}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {pageSizes.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
});

export default Tables;
