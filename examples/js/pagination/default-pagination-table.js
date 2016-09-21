/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'tm-react-bootstrap-table';


const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: 'Item name ' + id,
      price: 2100 + i
    });
  }
}

addProducts(70);

export default class DefaultPaginationTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = {
      paginationShowsTotal: true
    };
    const selectRow = {
      mode: 'checkbox',
      bgColor: '#fcf8da',
      clickToSelect: true,
      hideSelectColumn: false
    };
    return (
      <div>
        <BootstrapTable
          data={ products }
          pagination
          options={ options }
          selectRow={ selectRow }
          caption={ <div><button className='btn btn-default btn-border'>God</button></div> }>
          <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
