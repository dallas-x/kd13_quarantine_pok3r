import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { useTable, useFilters, useAsyncDebounce, useSortBy, usePagination } from 'react-table';

const columns = [
  { Header: '#', accessor: 'Rank' },
  { Header: 'ID', accessor: 'Player_ID' },
  { Header: 'Name', accessor: 'Player' },
  { Header: 'Score', accessor: 'Score' },
];
const data = [
  { Player_ID: 0, Player: 'dave', Score: 5 },
  { Player_ID: 0, Player: 'zell', Score: 10 },
  { Player_ID: 0, Player: 'apple', Score: 20 },
];

const PlayersTable = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  return (
    <div className="ReactTable -striped -highlight">
      <table {...getTableProps()} className="rt-table">
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
                    <td key={i} {...cell.getCellProps()} className="rt-td">
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersTable;
