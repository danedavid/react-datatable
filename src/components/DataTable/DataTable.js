import React, { useMemo } from 'react';
import classNames from 'classnames';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

import './styles.scss';

const WIDTH_REGEX = /^[1-9]{1}(\d)*px$/;

const DataTable = ({
  columns,
  rows,
}) => {
  const hasPixelWidthValues = useMemo(
    () => columns.some((column) => (
      typeof column.width === 'string' &&
      WIDTH_REGEX.test(column.width.trim())
    )),
    [columns],
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
      />
      <TableBody
        columns={columns}
        rows={rows}
      />
    </table>
  );
};

export default DataTable;
