import React from 'react';

import TableRow from './TableRow';

const TableBody = ({
  rows,
  columns,
  selectCell,
}) => {
  return (
    <tbody>
      {
        rows.map((row) => {
          return (
            <TableRow
              key={row.id}
              row={row}
              columns={columns}
              selectCell={selectCell}
            />
          )
        })
      }
    </tbody>
  );
};

export default TableBody;
