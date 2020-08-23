import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({
  columns,
  selectCell: SelectCell,
}) => {
  return (
    <div className="dt-header">
      <div className="dt-row dt-header-row">
        <SelectCell />
        {
          columns.map((column) => {
            const styles = {};

            if (column.width) {
              styles.width = column.width;
            } else {
              const flexBasis = (100 / columns.length);
              styles.flexBasis = `${flexBasis.toFixed(2)}%`;
            }

            return (
              <div
                key={column.key}
                className="dt-cell dt-header-cell"
                style={{...styles}}
              >
                {column.label}
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectCell: PropTypes.elementType.isRequired,
};

export default TableHeader;
