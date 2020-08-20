import React from 'react';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

import './styles.scss';

const DataTable = ({
  columns,
  rows,
}) => {
  return (
    <table className="dt-table">
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
