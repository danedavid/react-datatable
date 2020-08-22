import React from 'react';

const TableRow = ({
  row,
  columns,
  selectCell: SelectCell,
  reactWindowStyleObj,
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
    <div
      className="dt-row"
      style={reactWindowStyleObj}
    >
      <SelectCell rowId={row.id} />
      {
        tableCells.map((data) => {
          const styles = {};

          if (data.width) {
            styles.width = data.width;
          } else {
            const flexBasis = (100 / columns.length);
            styles.flexBasis = `${flexBasis.toFixed(2)}%`;
          }

          return (
            <div
              key={data.key}
              className="dt-cell"
              style={{...styles}}
            >
              {data.value}
            </div>
          );
        })
      }
    </div>
  );
};

export default TableRow;
