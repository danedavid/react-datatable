import React, { useMemo, useCallback } from 'react';
import classNames from 'classnames';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

import './styles.scss';

const WIDTH_PX_REGEX = /^[1-9]{1}(\d)*px$/;

const DataTable = ({
  columns,
  rows,
  selectable,
  selection: selectionProps,
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
        <th className="dt-cell dt-header-cell">
          <input
            type="checkbox"
            checked={selectionProps.selectedKeys.length === rows.length}
            onChange={(ev) => {
              selectionProps.onChange(
                ev.target.checked
                  ? rows.map((row) => row.id)
                  : []
              );
            }}
          />
        </th>
      );
    } else {
      SelectCell = ({ rowId }) => (
        <td
          className="dt-cell"
        >
          <input
            type="checkbox"
            checked={selectionProps.selectedKeys.includes(rowId)}
            onChange={(ev) => {
              selectionProps.onChange(
                ev.target.checked
                  ? ([
                    ...selectionProps.selectedKeys,
                    rowId,
                  ])
                  : selectionProps.selectedKeys.filter(
                    key => key !== rowId
                  )
              );
            }}
          />
        </td>
      );
    }

    return SelectCell;
  }, [
    selectable,
    selectionProps,
    rows,
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
    <table
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
        selectCell={SelectCell}
      />
    </table>
  );
};

export default DataTable;
