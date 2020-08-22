import React, {
  useState,
  useRef,
  useCallback,
} from 'react';
import { VariableSizeList as List } from 'react-window';

import TableRow from './TableRow';

const TableBody = ({
  rows,
  columns,
  selectCell,
  onRowClick,
}) => {
  const [sizeMap, setSizeMap] = useState({});
  const listRef = useRef();
  const setSizeForWindowing = useCallback((index, size) => {
    setSizeMap({
      ...sizeMap,
      [index]: size,
    });
    listRef.current.resetAfterIndex(index, false);
  }, [sizeMap, setSizeMap]);

  return (
    <List
      ref={listRef}
      height={240}
      itemCount={rows.length}
      itemSize={(idx) => sizeMap[idx] || 50}
      width="100%"
    >
      {({ index, style }) => {
        const row = rows[index];

        return (
          <TableRow
            row={row}
            columns={columns}
            selectCell={selectCell}
            onRowClick={onRowClick}
            rowIndex={index}
            reactWindowStyleObj={style}
            setSizeForWindowing={setSizeForWindowing}
            hasComputedSize={Boolean(sizeMap[index])}
          />
        )
      }}
    </List>
  );
};

export default TableBody;
