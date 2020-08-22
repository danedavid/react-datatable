import React, { useState } from 'react';

import DataTable from './DataTable';

import './App.scss';
import db from './data.json';

function App() {
  const [selectable, setSelectable] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const onChange = (keys) => {
    setSelectedKeys(keys);
  };

  return (
    <div className="table-container">
      <DataTable
        selectable={selectable}
        selection={{
          selectedKeys,
          onChange,
        }}
        columns={[{
          key: 'id',
          label: 'ID',
          numeric: true,
        }, {
          key: 'name',
          label: 'Name',
        }, {
          key: 'price',
          label: 'Price',
          numeric: true,
        }]}
        rows={db.data}
        onRowClick={(rowData, rowIndex) => {
          console.log(rowData, rowIndex);
        }}
      />
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setSelectable(!selectable)}>
          Selection: {selectable ? 'ON' : 'OFF'}
        </button>
        {selectable && <div>
          selected keys:
          {
            selectedKeys.length > 50
            ? `Selected ${selectedKeys.length} keys`
            : selectedKeys.map(k => `${k} `)
          }
        </div>}
      </div>
    </div>
  );
}

export default App;
