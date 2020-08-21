import React from 'react';

const TableRow = ({
  row,
  columns,
  selectCell: SelectCell,
}) => {
  const tableCells = columns.map((column) => {
    return {
      value: row[column.key],
      key: `${column.key}-${row.id}`,
      width: column.width || null,
      __columnMeta__: column,
    };
  });

  return (
    <tr className="dt-row">
      <SelectCell rowId={row.id} />
      {
        tableCells.map((data) => {
          const styles = {};

          if (data.width) {
            styles.width = data.width;
          }

          return (
            <td
              key={data.key}
              className="dt-cell"
              style={{...styles}}
            >
              {data.value}
            </td>
          );
        })
      }
    </tr>
  );
};

export default TableRow;
