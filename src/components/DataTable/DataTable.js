import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

import './styles.scss';

const WIDTH_PX_REGEX = /^[1-9]{1}(\d)*px$/;

const DataTable = ({
  columns,
  rows,
  rowKey,
  selectable,
  selectedKeys,
  onSelectionChange,
  onRowClick,
  infiniteLoading: {
    totalRowCount,
    loadMoreData,
    pageSize,
  },
  height,
}) => {
  const hasPixelWidthValues = useMemo(
    () => columns.some((column) => (
      typeof column.width === 'string' &&
      WIDTH_PX_REGEX.test(column.width.trim())
    )),
    [columns],
  );

  const getSelectCell = useCallback(({
    header = false,
  } = {}) => {
    let SelectCell;
    if ( !selectable ) {
      SelectCell = () => null;
    } else if ( header ) {
      SelectCell = () => (
        <div className="dt-cell dt-header-cell dt-cell--select">
          <input
            type="checkbox"
            checked={rows.length > 0 && selectedKeys.length === rows.length}
            onClick={(ev) => ev.stopPropagation()}
            onChange={(ev) => {
              onSelectionChange(
                ev.target.checked
                  ? rows.map((row) => row[rowKey])
                  : [],
              );
            }}
          />
        </div>
      );
    } else {
      SelectCell = ({ rowId }) => (
        <div
          className="dt-cell dt-cell--select"
        >
          <input
            type="checkbox"
            checked={selectedKeys.includes(rowId)}
            onClick={(ev) => ev.stopPropagation()}
            onChange={(ev) => {
              onSelectionChange(
                ev.target.checked
                  ? ([
                    ...selectedKeys,
                    rowId,
                  ])
                  : selectedKeys.filter(
                    key => key !== rowId
                  ),
              );
            }}
          />
        </div>
      );
    }

    return SelectCell;
  }, [
    selectable,
    selectedKeys,
    onSelectionChange,
    rows,
    rowKey,
  ]);

  const SelectCell = useMemo(
    () => getSelectCell(),
    [getSelectCell]
  );
  const HeaderSelectCell = useMemo(
    () => getSelectCell({ header: true }),
    [getSelectCell]
  );

  return (
    <div
      className={classNames({
        "dt-table": true,
        "dt-table--full-width": !hasPixelWidthValues,
      })}
    >
      <TableHeader
        columns={columns}
        selectCell={HeaderSelectCell}
      />
      <TableBody
        columns={columns}
        rows={rows}
        rowKey={rowKey}
        selectCell={SelectCell}
        onRowClick={onRowClick}
        infiniteLoading={Boolean(totalRowCount && loadMoreData && pageSize)}
        totalRowCount={totalRowCount || rows.length}
        loadMoreData={loadMoreData}
        pageSize={pageSize}
        height={height}
      />
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectable: PropTypes.bool,
  selectedKeys: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  onSelectionChange: PropTypes.func,
  onRowClick: PropTypes.func,
  infiniteLoading: PropTypes.shape({
    totalRowCount: PropTypes.number,
    loadMoreData: PropTypes.func,
    pageSize: PropTypes.number,
  }),
  rowKey: PropTypes.string,
  height: PropTypes.number,
};

DataTable.defaultProps = {
  selectable: false,
  infiniteLoading: {},
  rowKey: 'id',
  height: 500,
};

export default DataTable;
