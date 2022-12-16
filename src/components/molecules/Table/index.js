import React, { useMemo } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "../FilterComponent";

import './table.css'

const customStyles = {
  headCells: {
    style: {
      fontSize: '14px',
      fontWeight: '700',
      color : "#FF0000;"
    },
  },
};

const Table = props => {
  // console.log('props', props)
  const columns = useMemo( () => 
    {
      if (props.type === 'transaction') {
        return [
          {
            name: "Name",
            selector: row => row.name,
            sortable: true,
            grow: 2
          },
          {
            name: "Email",
            selector: row => row.email,
            sortable: true,
            hide: "sm"
          },
          {
            name: "City",
            selector: row => row.city,
            sortable: true,
            hide: "md"
          },
          {
            name: "Buttons",
            button: true,
            cell: row =>
              // console.log('row', row)
              row.showButtons ? (
                <>
                  <button
                    onClick={() => props.click(row.name)}
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </button>
                  <button onClick={() => props.click(row.name)}>Delete</button>
                </>
              ) : null
          }
        ]
      }
    }
  ,[]);


  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      // title="Contact List"
      columns={columns}
      data={filteredItems}
      defaultSortField="name"
      striped
      pagination
      responsive
      subHeader
      subHeaderComponent={subHeaderComponent}
      customStyles={customStyles}
    />
  );
};

export default Table;
