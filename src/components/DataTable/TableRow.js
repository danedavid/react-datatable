import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

const TableRow = ({
  row,
  columns,
  selectCell: SelectCell,
  reactWindowStyleObj,
  onRowClick = null,
  rowIndex,
  setSizeForWindowing,
  hasComputedSize,
}) => {
  const rowRef = useRef();

  const tableCells = columns.map((column) => {
    return {
      value: row[column.key],
      key: `${column.key}-${row.id}`,
      width: column.width || null,
      __columnMeta__: column,
    };
  });

  useEffect(() => {
    if (!hasComputedSize) {
      // set height for windowing
      const height = rowRef.current.getBoundingClientRect().height
      setSizeForWindowing(rowIndex, height);
    }
  }, [hasComputedSize, setSizeForWindowing, rowIndex]);

  return (
    <div style={reactWindowStyleObj}>
      {/*
        Two divs: outer receives the initial 50px from VariableSizeList.
        Inner div renders with actual height of elem, and sets height in
        parent cache, which then is passed to the outer div.
      */}
      <div
        ref={rowRef}
        className={classNames({
          "dt-row": true,
          "dt-row--clickable": Boolean(onRowClick),
        })}
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
    </div>
  );
};

export default TableRow;
