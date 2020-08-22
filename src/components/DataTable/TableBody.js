import React from 'react';
import { VariableSizeList as List } from 'react-window';

import TableRow from './TableRow';

const TableBody = ({
  rows,
  columns,
  selectCell,
  onRowClick,
}) => {
  return (
    <List
      height={240}
      itemCount={rows.length}
      itemSize={() => 50}
      width="100%"
    >
      {({ index, style }) => {
        const row = rows[index];

        return (
          <TableRow
            reactWindowStyleObj={style}
            row={row}
            columns={columns}
            selectCell={selectCell}
            onRowClick={onRowClick}
            rowIndex={index}
          />
        )
      }}
    </List>
  );
};

export default TableBody;
