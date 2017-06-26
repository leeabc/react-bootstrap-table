import PropTypes from 'prop-types';
import React, { Component } from 'react';

class SelectRowHeaderColumn extends Component {

  render() {
    return (
      <th className='col-chkbox'>
        { this.props.children }
      </th>
    );
  }
}
SelectRowHeaderColumn.propTypes = {
  children: PropTypes.node
};
export default SelectRowHeaderColumn;
