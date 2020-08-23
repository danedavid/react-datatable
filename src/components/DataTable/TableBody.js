import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import TableRow from './TableRow';
import LoadingTableRow from './LoadingTableRow';

const PAGE_STATUS = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
};

const TableBody = ({
  rows,
  columns,
  rowKey,
  selectCell,
  onRowClick,
  infiniteLoading,
  totalRowCount,
  loadMoreData,
  pageSize,
  height,
}) => {
  const [sizeMap, setSizeMap] = useState({});

  const listRef = useRef();
  const pagesMap = useRef({}); // status of all pages
  const pageLoading = useRef(true); // if any page is loading currently
  // queue to maintain list of pages yet to load
  const [queue, setQueue] = useState([]);

  // set loaded pages status
  useEffect(() => {
    if (infiniteLoading) {
      for (let i = 0; i < (rows.length / pageSize); i += 1) {
        pagesMap.current[i + 1] = PAGE_STATUS.LOADED;
      }
      pageLoading.current = Object.values(pagesMap.current).some(
        (pg) => pg === PAGE_STATUS.LOADING,
      );

      // if there are no current loading pages
      // & queue is empty, load next page from queue
      if (!pageLoading.current && queue.length !== 0) {
        const pageNo = queue.slice(0, 1);
        setQueue(queue.slice(1));

        pagesMap.current[pageNo] = PAGE_STATUS.LOADING;
        pageLoading.current = true;

        loadMoreData(pageNo);
      }
    }
  }, [rows, pageSize, queue, loadMoreData, infiniteLoading]);

  const setSizeForWindowing = useCallback((index, size) => {
    setSizeMap({
      ...sizeMap,
      [index]: size,
    });
    if (listRef && listRef.current) {
      listRef.current.resetAfterIndex(index, false);
    }
  }, [sizeMap, setSizeMap]);

  const isItemLoaded = (index) => index < rows.length;

  const pushToQueue = (pageNo) => {
    if (!pagesMap.current[pageNo]) {
      setQueue(
        (prevQueue) => (prevQueue.includes(pageNo)
          ? prevQueue
          : ([...prevQueue, pageNo])),
      );
    }
  };

  const loadMoreItems = (startIndex, endIndex) => {
    const endIndexPage = Math.floor(endIndex / pageSize) + 1;

    // If scrolling to random location, load all
    // rows until that point, in order
    for (let pNo = 1; pNo <= endIndexPage; pNo += 1) {
      pushToQueue(pNo);
    }
  };

  const renderVirtualizedList = ({
    // eslint-disable-next-line react/prop-types
    ref,
    // eslint-disable-next-line react/prop-types
    onItemsRendered,
  } = {}) => {
    const infiniteLoadingProps = {};
    if (infiniteLoading) {
      infiniteLoadingProps.onItemsRendered = onItemsRendered;
    }

    return (
      <List
        ref={ref}
        height={height}
        itemCount={totalRowCount}
        itemSize={(idx) => sizeMap[idx] || 50}
        width="100%"
        overscanCount={2}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...infiniteLoadingProps}
      >
        {({ index, style }) => {
          // if row is not loaded yet, render placeholder
          if (index >= rows.length) {
            return (
              <LoadingTableRow
                reactWindowStyleObj={style}
              />
            );
          }

          const row = rows[index];
          return (
            <TableRow
              row={row}
              columns={columns}
              rowKey={rowKey}
              selectCell={selectCell}
              onRowClick={onRowClick}
              rowIndex={index}
              reactWindowStyleObj={style}
              setSizeForWindowing={setSizeForWindowing}
              hasComputedSize={Boolean(sizeMap[index])}
            />
          );
        }}
      </List>
    );
  };

  if (!infiniteLoading) {
    return renderVirtualizedList({
      ref: listRef,
    });
  }

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={totalRowCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => renderVirtualizedList({
        ref: (el) => {
          listRef.current = el;
          ref(el);
        },
        onItemsRendered,
      })}
    </InfiniteLoader>
  );
};

TableBody.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowKey: PropTypes.string.isRequired,
  selectCell: PropTypes.elementType.isRequired,
  onRowClick: PropTypes.func.isRequired,
  infiniteLoading: PropTypes.bool.isRequired,
  totalRowCount: PropTypes.number.isRequired,
  loadMoreData: PropTypes.func,
  pageSize: PropTypes.number,
  height: PropTypes.number.isRequired,
};

TableBody.defaultProps = {
  loadMoreData: () => {},
  pageSize: 1, // to prevent possible divide by zero issue
};

export default TableBody;
