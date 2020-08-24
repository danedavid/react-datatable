import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TableRow = ({
  row,
  columns,
  rowKey,
  selectCell: SelectCell,
  reactWindowStyleObj,
  onRowClick,
  rowIndex,
  setSizeForWindowing,
  hasComputedSize,
}) => {
  const rowRef = useRef();

  const rowId = row[rowKey];

  const tableCells = columns.map((column) => ({
    value: row[column.key],
    key: `${column.key}-${rowId}`,
    width: column.width || null,
    numeric: column.numeric,
    __columnMeta__: column,
  }));

  useEffect(() => {
    if (!hasComputedSize) {
      // set height for windowing
      const { height } = rowRef.current.getBoundingClientRect();
      setSizeForWindowing(rowIndex, height);
    }
  }, [hasComputedSize, setSizeForWindowing, rowIndex]);

  const clickableProps = {};
  if (onRowClick) {
    clickableProps.onClick = () => onRowClick(row, rowIndex);
    clickableProps.tabIndex = 0;
  }

  return (
    <div style={reactWindowStyleObj} role="none">
      {/*
        Two divs: outer receives the initial 50px from VariableSizeList.
        Inner div renders with actual height of elem, and sets height in
        parent cache, which then is passed to the outer div.
      */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        ref={rowRef}
        className={classNames({
          'dt-row': true,
          'dt-row--clickable': Boolean(onRowClick),
        })}
        role="row"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...clickableProps}
      >
        <SelectCell rowId={rowId} />
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
                className={classNames({
                  'dt-cell': true,
                  'dt-cell--numeric': data.numeric,
                })}
                role="cell"
                style={{ ...styles }}
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

TableRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  row: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowKey: PropTypes.string.isRequired,
  selectCell: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  reactWindowStyleObj: PropTypes.object.isRequired,
  onRowClick: PropTypes.func,
  rowIndex: PropTypes.number.isRequired,
  setSizeForWindowing: PropTypes.func.isRequired,
  hasComputedSize: PropTypes.bool.isRequired,
};

TableRow.defaultProps = {
  onRowClick: null,
};

export default TableRow;
