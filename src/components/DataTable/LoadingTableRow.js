import React from 'react';
import PropTypes from 'prop-types';

const LoadingTableRow = ({
  reactWindowStyleObj,
}) => {
  return (
    <div style={reactWindowStyleObj}>
      <div
        className="dt-row dt-row--loading"
        role="row"
      >
        <span className="dt-loading-span" />
        <span className="dt-loading-span" />
        <span className="dt-loading-span" />
      </div>
    </div>
  );
};

LoadingTableRow.propTypes = {
  reactWindowStyleObj: PropTypes.object.isRequired,
};

export default LoadingTableRow;
