import React from 'react';
import PropTypes from 'prop-types';

const LoadingTableRow = ({
  reactWindowStyleObj,
}) => (
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

LoadingTableRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  reactWindowStyleObj: PropTypes.object.isRequired,
};

export default LoadingTableRow;
