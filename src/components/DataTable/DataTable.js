import React from 'react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

const DataTable = ({
  columns,
  rows,
}) => {
  return (
    <table>
      <TableHeader
        columns={columns}
      />
      <TableBody
        columns={columns}
        rows={rows}
      />
    </table>
  );
};

export default DataTable;
