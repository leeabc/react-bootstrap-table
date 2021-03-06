import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classSet from 'classnames';

class PageButton extends Component {

  constructor(props) {
    super(props);
  }

  pageBtnClick = e => {
    e.preventDefault();
    this.props.changePage(this.props.btnKey);
  }

  render() {
    const classes = classSet({
      'active': this.props.active,
      'disabled': this.props.disable,
      'hidden': this.props.hidden,
      'page-item': true
    });
    return (
      <li className={ classes }>
        <a href='#' onClick={ this.pageBtnClick } className='page-link'>{ this.props.children }</a>
      </li>
    );
  }
}
PageButton.propTypes = {
  changePage: PropTypes.func,
  active: PropTypes.bool,
  disable: PropTypes.bool,
  hidden: PropTypes.bool,
  btnKey: PropTypes.string,
  children: PropTypes.node
};

export default PageButton;
