# react-datatable

React table component for data at scale. Supports virtualization and infinite scroll.

## `<DataTable />` Usage

```jsx
<DataTable
  selectable
  selectedKeys={selectedKeys}
  onSelectionChange={(selection) => {
    setSelectedKeys(selection);
  }}
  columns={[{
    key: 'id',
    label: 'ID',
  }, {
    key: 'title',
    label: 'Title',
  }, {
    key: 'url',
    label: 'URL',
  }, {
    key: 'albumId',
    label: 'Album ID',
    numeric: true,
  }]}
  rows={[{
    id: 1,
    title: 'Lorem Ipsum',
    url: (
      <a href="http://www.example.com/1">
        Link 1
      </a>
    ),
    albumId: 68,
  }, {
    id: 2,
    title: 'Suspendisse ut leo',
    url: (
      <a href="http://www.example.com/2">
        Link 2
      </a>
    ),
    albumId: 72,
  }]}
  onRowClick={(rowData, rowIndex) => {
    console.log(rowData, rowIndex);
  }}
  infiniteLoading={{
    loadMoreData: async (pageNo) => {
      const res = await fetchData(pageNo);
      // set data in state
    },
    pageSize: 50,
    totalRowCount: 10000,
  }}
/>
```

## `<DataTable />` API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| columns | object[] | [] | Columns definition for the table. See Column Props |
| rows | object[] | [] | Data rows for the table, having keys specified in `columns`. Values can be of type string, number or `ReactNode` |
| rowKey | string \| number | 'id' | The key that will be used to uniquely identify each row |
| height | number | 500 | Height of table |
| selectable | boolean | false | Whether table rows are selectable. If true, checkboxes will be rendered for each row |
| selectedKeys | string[] \| number[] | [] | List of selected keys |
| onSelectionChange | `(selectedKeys: string[]) => void` | noop | Callback executed when select/deselect rows |
| onRowClick | `(rowData: object, rowIndex: number) => void` | noop | Callback executed when a row is clicked |
| infiniteLoading | object | {} | See Infinite Loading props |


#### Column Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key | string | - | Object key to look up in `rows` |
| label | string | - | Column header text |
| numeric | boolean | false | If true, text in that column will be right aligned |
| width | string | - | Width of columns. Eg: `'10px', '20%'` |


#### Infinite Loading Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| totalRowCount | number | - | Total no. of rows in the remote source. If unknown initially some arbitrarily large number can be provided |
| pageSize | number | - | No. of rows in one page/batch |
| loadMoreData | `(pageNo: number) => void` | - | Callback will be invoked on scrolling down to pages not loaded yet, with page number. Make the data fetch from this function. |