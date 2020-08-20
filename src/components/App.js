import React from 'react';

import DataTable from './DataTable';

import './App.scss';

function App() {
  return (
    <div className="table-container">
      <DataTable
        columns={[{
          key: 'id',
          label: 'ID',
          numeric: true,
          width: '10%',
        }, {
          key: 'name',
          label: 'Name',
          width: '70%',
        }, {
          key: 'price',
          label: 'Price',
          numeric: true,
          width: '20%',
        }]}
        rows={[{
          id: 1,
          price: 106800,
          name: 'iPhone 11 Pro',
        }, {
          id: 2,
          name: 'OnePlus 8 pro',
          price: 54000,
        }]}
      />
    </div>
  );
}

export default App;
