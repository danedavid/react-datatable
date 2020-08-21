import React from 'react';

const TableHeader = ({
  columns,
  selectCell: SelectCell,
}) => {
  return (
    <thead className="dt-header">
      <tr className="dt-row dt-header-row">
        <SelectCell />
        {
          columns.map((column) => {
            return (
              <th key={column.key} className="dt-cell dt-header-cell">
                {column.label}
              </th>
            )
          })
        }
      </tr>
    </thead>
  );
};

export default TableHeader;
