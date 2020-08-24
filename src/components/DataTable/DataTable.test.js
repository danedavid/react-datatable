/* eslint-disable */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow, render } from 'enzyme';

import DataTable from './DataTable';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableRow from './TableRow';
import { VariableSizeList as List } from 'react-window';

configure({ adapter: new Adapter() });

const renderShallow = () => shallow(
  <DataTable
    columns={[{
      key: 'id',
      label: 'ID',
    }, {
      key: 'name',
      label: 'Name',
    }]}
    rows={[{
      id: 1,
      name: 'Lorem Ipsum',
    }, {
      id: 2,
      title: 'Suspendisse ut leo',
    }]}
  />
);

describe('<DataTable />', () => {
  it('renders table', () => {
    const wrapper = renderShallow();
    expect(wrapper.find('.dt-table').length).toBe(1);
  });

  it('renders column headers', () => {
    const wrapper = renderShallow();

    expect(wrapper.find(TableHeader).length).toBe(1);

    const tableHeader = wrapper.find(TableHeader);
    expect(tableHeader.dive().find('.dt-header-row').length).toBe(1);
    expect(tableHeader.dive().find('.dt-header-cell').length).toBe(2);
  });

  it('renders column rows', () => {
    const wrapper = renderShallow();

    expect(wrapper.find(TableBody).length).toBe(1);

    const tableBody = wrapper.find(TableBody);
    expect(tableBody.dive().find(List).length).toBe(1);

    const reactWindowList = tableBody.dive().find(List);
    expect(
      reactWindowList.renderProp('children')({
        index: 0,
        style: {},
      }).type()
    ).toBe(TableRow);

    const staticList = reactWindowList.render();
    expect(staticList.find('.dt-row').length).toBe(2);
  });
});