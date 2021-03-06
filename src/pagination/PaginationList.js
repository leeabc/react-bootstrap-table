import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PageButton from './PageButton.js';
import Const from '../Const';

class PaginationList extends Component {

  constructor(props) {
    super(props)
    this.state = { pageInput: this.props.currPage }
  }

  changePage = page => {
    const {
      pageStartIndex,
      prePage,
      currPage,
      nextPage,
      lastPage,
      firstPage,
      sizePerPage
    } = this.props;

    let pageNumber = 0
    if (page === 'prev') {
      pageNumber = (currPage - 1) < pageStartIndex ? pageStartIndex : currPage - 1;
    } else if (page === 'next') {
      pageNumber = (currPage + 1) > this.lastPage ? this.lastPage : currPage + 1;
    } else if (page === lastPage) {
      pageNumber = this.lastPage;
    } else if (page === firstPage) {
      pageNumber = pageStartIndex;
    } else {
      pageNumber = parseInt(page, 10);
    }
    if (pageNumber !== currPage && pageNumber <= this.totalPages && pageNumber >= 1) {
      this.props.changePage(pageNumber, sizePerPage);
      this.setState({ pageInput: pageNumber })
    }
  }

  handlePageInput = e => {
    this.setState({
      pageInput: e.target.value
    })
  }

  changePageByInput = e => {
    if (e.key !== 'Enter') return

    const page = this.state.pageInput > this.totalPages
      ? this.totalPages
      : this.state.pageInput

    this.changePage(page)
  }

  changeSizePerPage = e => {
    e.preventDefault();

    const selectSize = parseInt(e.currentTarget.getAttribute('data-page'), 10);
    let { currPage } = this.props;
    if (selectSize !== this.props.sizePerPage) {
      this.totalPages = Math.ceil(this.props.dataSize / selectSize);
      this.lastPage = this.props.pageStartIndex + this.totalPages - 1;
      this.props.changePage(1, selectSize);
      this.setState({ pageInput: 1 });
      if (this.props.onSizePerPageList) {
        this.props.onSizePerPageList(selectSize);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currPage !== this.state.pageInput) {
      this.setState({ pageInput: nextProps.currPage })
    }
  }

  render() {
    const {
      currPage,
      dataSize,
      sizePerPage,
      sizePerPageList,
      paginationShowsTotal,
      pageStartIndex,
      hideSizePerPage
    } = this.props;

    this.totalPages = Math.ceil(dataSize / sizePerPage);
    this.lastPage = this.props.pageStartIndex + this.totalPages - 1;
    const pageBtns = this.makePage();
    const pageListStyle = {
      // override the margin-top defined in .pagination class in bootstrap.
      margin: '0px'
    };

    const sizePerPageOptions = sizePerPageList.map((_sizePerPage) => {
      const pageText = _sizePerPage.text || _sizePerPage;
      const pageNum = _sizePerPage.value || _sizePerPage;
      const selected = pageNum === sizePerPage ? 'selected' : '';
      return (
        <li key={ pageText } className={ selected } role='presentation'>
          <a role='menuitem'
            tabIndex='-1' href='#'
            data-page={ pageNum }
            onClick={ this.changeSizePerPage }>{ pageText }</a>
        </li>
      );
    });

    const offset = Math.abs(Const.PAGE_START_INDEX - pageStartIndex);
    let start = ((currPage - pageStartIndex) * sizePerPage);
    start = dataSize === 0 ? 0 : start + 1;
    let to = Math.min((sizePerPage * (currPage + offset) - 1), dataSize);
    if (to >= dataSize) to--;
    let total = <span>Records { start } -&nbsp;{ to + 1 } /&nbsp;{ dataSize }</span>;

    if (typeof paginationShowsTotal === 'function') {
      total = paginationShowsTotal(start, to, dataSize);
    }

    const dropDownStyle = {
      visibility: hideSizePerPage ? 'hidden' : 'visible'
    };

    return (
      <div className='table-pagination-block'>
        <div className='pagination-records'>{ total }{ ' ' }</div>
        <div className='dropdown' style={ dropDownStyle }>
          <button className='btn btn-xs btn-link dropdown-toggle'
            type='button' id='pageDropDown' data-toggle='dropdown'
            aria-expanded='true'>
            { sizePerPage } per page
            <span>
              { ' ' }
              <span className='caret'/>
            </span>
          </button>
          <ul className='dropdown-menu dropdown-menu-multi-select' role='menu'>
            { sizePerPageOptions }
          </ul>
        </div>
        <div className='pagination-input'>
          <input type='text' onKeyPress={ this.changePageByInput } onChange={ this.handlePageInput } value={ this.state.pageInput }/> /{ this.totalPages }
        </div>
        <div>
          <ul className='pagination' style={ pageListStyle }>
            { pageBtns }
          </ul>
        </div>
      </div>
    );
  }

  makePage() {
    const pages = [
      { node: <span className='fa fa-angle-left'></span>, key: 'prev' },
      { node: <span className='fa fa-angle-right'></span>, key: 'next' }
    ];
    return pages.map(function(page) {
      let disabled = false;
      if (this.props.currPage === this.props.pageStartIndex &&
        (page.key === 'prev')) {
        disabled = true;
      }
      if (this.props.currPage === this.lastPage &&
        (page.key === 'next')) {
        disabled = true;
      }
      return (
        <PageButton key={ page.key }
          btnKey={ page.key }
          changePage={ this.changePage }
          disable={ disabled }>
          { page.node }
        </PageButton>
      );
    }, this);
  }
}
PaginationList.propTypes = {
  currPage: PropTypes.number,
  sizePerPage: PropTypes.number,
  dataSize: PropTypes.number,
  changePage: PropTypes.func,
  sizePerPageList: PropTypes.array,
  paginationShowsTotal: PropTypes.oneOfType([ PropTypes.bool, PropTypes.func ]),
  paginationSize: PropTypes.number,
  remote: PropTypes.bool,
  onSizePerPageList: PropTypes.func,
  prePage: PropTypes.string,
  pageStartIndex: PropTypes.number,
  hideSizePerPage: PropTypes.bool
};

PaginationList.defaultProps = {
  sizePerPage: Const.SIZE_PER_PAGE,
  pageStartIndex: Const.PAGE_START_INDEX
};

export default PaginationList;
