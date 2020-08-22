import React from 'react';
import classNames from 'classnames';

const TableRow = ({
  row,
  columns,
  selectCell: SelectCell,
  reactWindowStyleObj,
  onRowClick = null,
  rowIndex,
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
      className={classNames({
        "dt-row": true,
        "dt-row--clickable": Boolean(onRowClick),
      })}
      style={reactWindowStyleObj}
      onClick={() => {
        if (onRowClick) {
          onRowClick(row, rowIndex);
        }
      }}
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
