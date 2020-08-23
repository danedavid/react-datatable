import React, { useState, useMemo } from 'react';
import DataTable from './DataTable';
import './App.scss';

const fetchData = async (albumId) => window.fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
  .then((res) => res.json());

const PAGE_SIZE = 50;
const TOTAL_COUNT = 5000;

const App = () => {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [photos, setPhotos] = useState([]);

  const tableColumns = useMemo(
    () => ([{
      key: 'id',
      label: 'ID',
    }, {
      key: 'title',
      label: 'Title',
    }, {
      key: 'thumbnail',
      label: 'Thumbnail',
    }, {
      key: 'url',
      label: 'URL',
    }, {
      key: 'albumId',
      label: 'Album ID',
      numeric: true,
    }]),
    [],
  );

  const tableRows = useMemo(
    () => photos.map((photo) => ({
      ...photo,
      thumbnail: (
        <div className="img-wrapper">
          <img
            alt="thumbnail"
            src={photo.thumbnailUrl}
            height="80"
            width="80"
          />
        </div>
      ),
      url: (
        <a
          href={photo.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {photo.url}
        </a>
      ),
    })),
    [photos],
  );

  const loadData = async (albumId) => {
    const res = await fetchData(albumId);
    setPhotos((prev) => [
      ...prev,
      ...res,
    ]);
  };

  return (
    <div className="table-container">
      <DataTable
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={(selection) => {
          setSelectedKeys(selection);
        }}
        columns={tableColumns}
        rows={tableRows}
        onRowClick={(rowData, rowIndex) => {
          console.log(rowData, rowIndex);
        }}
        infiniteLoading={{
          loadMoreData: loadData,
          pageSize: PAGE_SIZE,
          totalRowCount: TOTAL_COUNT,
        }}
      />
    </div>
  );
};

export default App;
