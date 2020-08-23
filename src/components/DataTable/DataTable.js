import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
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
  // maintain if all rows are selected
  const allSelected = useRef(false);
  // eslint-disable-next-line no-underscore-dangle
  const _onSelectionChange = useCallback((sel) => {
    if (sel.length === rows.length) {
      allSelected.current = true;
    } else {
      allSelected.current = false;
    }
    onSelectionChange(sel);
  }, [onSelectionChange, rows]);

  // on adding rows, make them selected by default
  // if allSelected is true
  useEffect(() => {
    if (
      allSelected.current
      && selectedKeys.length !== rows.length
    ) {
      _onSelectionChange(
        rows.map((row) => row[rowKey]),
      );
    }
  }, [selectedKeys, rows, rowKey, _onSelectionChange]);

  const hasPixelWidthValues = useMemo(
    () => columns.some((column) => (
      typeof column.width === 'string'
      && WIDTH_PX_REGEX.test(column.width.trim())
    )),
    [columns],
  );

  const getSelectCell = useCallback(({
    header = false,
  } = {}) => {
    let SelectCell;
    if (!selectable) {
      SelectCell = () => null;
    } else if (header) {
      SelectCell = () => {
        const checked = rows.length > 0 && selectedKeys.length === rows.length;

        return (
          <div
            className="dt-cell dt-header-cell dt-cell--select"
            role="columnheader"
          >
            <input
              type="checkbox"
              checked={checked}
              aria-checked={checked}
              aria-label="Select All"
              onClick={(ev) => ev.stopPropagation()}
              onChange={(ev) => {
                _onSelectionChange(
                  ev.target.checked
                    ? rows.map((row) => row[rowKey])
                    : [],
                );
              }}
            />
          </div>
        );
      };
    } else {
      // eslint-disable-next-line react/prop-types
      SelectCell = ({ rowId }) => {
        const checked = selectedKeys.includes(rowId);

        return (
          <div
            className="dt-cell dt-cell--select"
            role="cell"
          >
            <input
              type="checkbox"
              checked={checked}
              aria-checked={checked}
              aria-label="Select Row"
              onClick={(ev) => ev.stopPropagation()}
              onChange={(ev) => {
                _onSelectionChange(
                  ev.target.checked
                    ? ([
                      ...selectedKeys,
                      rowId,
                    ])
                    : selectedKeys.filter(
                      (key) => key !== rowId,
                    ),
                );
              }}
            />
          </div>
        );
      };
    }

    return SelectCell;
  }, [
    selectable,
    selectedKeys,
    _onSelectionChange,
    rows,
    rowKey,
  ]);

  const SelectCell = useMemo(
    () => getSelectCell(),
    [getSelectCell],
  );
  const HeaderSelectCell = useMemo(
    () => getSelectCell({ header: true }),
    [getSelectCell],
  );

  return (
    <div
      className={classNames({
        'dt-table': true,
        'dt-table--full-width': !hasPixelWidthValues,
      })}
      role="grid"
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
  selectedKeys: [],
  onSelectionChange: () => {},
  onRowClick: () => {},
};

export default DataTable;
