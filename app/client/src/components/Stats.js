import React from 'react';
import { useTable, useSortBy } from 'react-table';

const Stats = ({ columns, data }) => {
  console.log('Calling Columns');
  console.log(columns);
  console.log('here comes playrs');
  console.log(data);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: columns,
      data: data,
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

  //   return (
  //     <tbody>
  //       {Players.length === 0 ? (
  //         <tr>
  //           <td className="text-left">0</td>
  //           <td className="text-center">000x0</td>
  //           <td className="text-right">No Name</td>
  //           <td className="text-right">0</td>
  //         </tr>
  //       ) : (
  //         Players.map((player) => (
  //           <tr key={player.Player_ID}>
  //             <td className="text-left">{player.Rank}</td>
  //             <td className="text-center">{player.Player_ID}</td>
  //             <td className="text-right">{player.Player}</td>
  //             <td className="text-right">{player.Score}</td>
  //             <td className="text-right">{player.TPP}</td>
  //           </tr>
  //         ))
  //       )}
  //     </tbody>
  //   );
};

export default Stats;
