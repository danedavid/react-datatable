import React from 'react';

import DataTable from './DataTable';

function App() {
  return (
    <DataTable
      columns={[{
        key: 'id',
        label: 'ID',
        numeric: true,
      }, {
        key: 'name',
        label: 'name',
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
      }]}
    />
  );
}

export default App;
