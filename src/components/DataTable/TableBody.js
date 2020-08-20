import React from 'react';

import TableRow from './TableRow';

const TableBody = ({
  rows,
  columns,
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
            />
          )
        })
      }
    </tbody>
  );
};

export default TableBody;
