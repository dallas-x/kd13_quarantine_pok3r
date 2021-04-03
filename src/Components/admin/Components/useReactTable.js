import React, { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Table } from 'reactstrap';

const useReactTable = ({ columns, data }) => {
  const [state, setState] = useState(data);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: columns,
      data: data,
    },
    useSortBy,
  );
  const table = () => (
    <div>
      <div className="ReactTable -striped -highlight">
        <Table {...getTableProps()} className="rt-table">
          <thead className="rt-thead bg-warning -header">
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()} className="rt-tr">
                {headerGroup.headers.map((column, i) => (
                  <th
                    key={i}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="rt-th"
                  >
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="rt-tbody">
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()} className="rt-tr">
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        key={i}
                        {...cell.getCellProps()}
                        className={i === columns.length - 1 ? 'rt-td text-right' : 'rt-td'}
                      >
                        {' '}
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
  return [state, table, setState];
};

export default useReactTable;
