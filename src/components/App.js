import React, { useState } from 'react';

import DataTable from './DataTable';

import './App.scss';

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
        rows={[{
          id: 1,
          price: 106800,
          name: 'iPhone 11 Pro',
        }, {
          id: 2,
          name: 'OnePlus 8 pro',
          price: 54000,
        }, {
          id: 3,
          name: 'OnePlus 7T pro',
          price: 5000,
        }, {
          id: 4,
          name: 'XYZ',
          price: 54000,
        }, {
          id: 5,
          name: 'Realme 8 pro',
          price: 54000,
        }, {
          id: 6,
          name: 'Redmi Note 8',
          price: 54000,
        }]}
      />
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setSelectable(!selectable)}>
          Selection: {selectable ? 'ON' : 'OFF'}
        </button>
        {selectable && <div>
          selected keys:
          {selectedKeys.map(k => `${k} `)}
        </div>}
      </div>
    </div>
  );
}

export default App;
