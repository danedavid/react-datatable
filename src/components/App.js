import React, { useState } from 'react';

import DataTable from './DataTable';

import './App.scss';
import db from './data.json';

const PAGE_SIZE = 100;

const mockApi = (pageNo) => new Promise((res, rej) => {
  setTimeout(() => {
    const start = ((pageNo - 1) * PAGE_SIZE);
    const end = pageNo * PAGE_SIZE;
    res({
      data: db.data.slice(start, end),
      count: db.data.length,
    });
  }, 2000);
})

function App() {
  const [selectable, setSelectable] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const loadData = async (pageNo) => {
    const res = await mockApi(pageNo);
    setData(prevData => [
      ...prevData,
      ...res.data,
    ]);
    if (totalCount === 0) {
      setTotalCount(res.count);
    }
  };

  return (
    <div className="table-container">
      <DataTable
        selectable={selectable}
        selectedKeys={selectedKeys}
        onSelectionChange={(selection) => {
          setSelectedKeys(selection);
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
        rows={data}
        onRowClick={(rowData, rowIndex) => {
          console.log(rowData, rowIndex);
        }}
        infiniteLoading={{
          loadMoreData: loadData,
          pageSize: PAGE_SIZE,
          totalRowCount: totalCount || 1000,
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
