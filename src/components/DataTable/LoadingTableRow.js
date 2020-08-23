import React from 'react';

const LoadingTableRow = ({
  reactWindowStyleObj,
}) => {
  return (
    <div style={reactWindowStyleObj}>
      <div
        className="dt-row dt-row--loading"
      >
        <span className="dt-loading-span" />
        <span className="dt-loading-span" />
        <span className="dt-loading-span" />
      </div>
    </div>
  );
};

export default LoadingTableRow;
