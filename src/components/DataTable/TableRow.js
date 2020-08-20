import React from 'react';

const TableRow = ({
  row,
  columns,
}) => {
  const tableCells = columns.map((column) => {
    return {
      value: row[column.key],
      key: `${column.key}-${row.id}`,
      __columnMeta__: column,
    };
  });

  return (
    <tr>
      {
        tableCells.map((data) => {
          return (
            <td key={data.key}>
              {data.value}
            </td>
          );
        })
      }
    </tr>
  );
};

export default TableRow;
