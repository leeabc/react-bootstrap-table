/* eslint default-case: 0 */
/* eslint guard-for-in: 0 */
import React, { Component, PropTypes } from 'react';
import classSet from 'classnames';
import Const from './Const';
import Util from './util';
import DateFilter from './filters/Date';
import TextFilter from './filters/Text';
import RegexFilter from './filters/Regex';
import SelectFilter from './filters/Select';
import NumberFilter from './filters/Number';

class TableHeaderColumn extends Component {

  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleColumnClick = () => {
    if (!this.props.dataSort) return;
    const order = this.props.sort === Const.SORT_DESC ? Const.SORT_ASC : Const.SORT_DESC;
    this.props.onSort(order, this.props.dataField);
  }

  handleFilter(value, type) {
    this.props.filter.emitter.handleFilter(this.props.dataField, value, type);
  }

  getFilters() {
    switch (this.props.filter.type) {
    case Const.FILTER_TYPE.TEXT: {
      return (
        <TextFilter ref='textFilter' { ...this.props.filter }
          columnName={ this.props.children } filterHandler={ this.handleFilter } />
      );
    }
    case Const.FILTER_TYPE.REGEX: {
      return (
        <RegexFilter ref='regexFilter' { ...this.props.filter }
          columnName={ this.props.children } filterHandler={ this.handleFilter } />
      );
    }
    case Const.FILTER_TYPE.SELECT: {
      return (
        <SelectFilter ref='selectFilter' { ...this.props.filter }
          columnName={ this.props.children } filterHandler={ this.handleFilter } />
      );
    }
    case Const.FILTER_TYPE.NUMBER: {
      return (
        <NumberFilter ref='numberFilter' { ...this.props.filter }
          columnName={ this.props.children } filterHandler={ this.handleFilter } />
      );
    }
    case Const.FILTER_TYPE.DATE: {
      return (
        <DateFilter ref='dateFilter' { ...this.props.filter }
          columnName={ this.props.children } filterHandler={ this.handleFilter } />
      );
    }
    case Const.FILTER_TYPE.CUSTOM: {
      return this.props.filter.getElement(this.handleFilter,
          this.props.filter.customFilterParameters);
    }
    }
  }

  componentDidMount() {
    this.refs['header-col'].setAttribute('data-field', this.props.dataField);
  }

  render() {
    let defaultCaret;
    const {
      dataAlign,
      dataField,
      headerAlign,
      hidden,
      sort,
      dataSort,
      children,
      caretRender,
      className
    } = this.props;
    const thStyle = {
      textAlign: headerAlign || dataAlign,
      display: hidden ? 'none' : null
    };

    let classes = this.props.className + ' ' + (dataSort ? 'sort-column sortable' : '');
    classes += sort ? (' sort-' + sort) : '';

    const title = typeof children === 'string' ? { title: children } : null;
    const childrenContent = dataSort ? <div className='sort-indicator'>{ children }</div> : children;

    return (
      <th ref='header-col'
          className={ classes }
          style={ thStyle }
          onClick={ this.handleColumnClick }
          { ...title }>
        { childrenContent }
        <div onClick={ e => e.stopPropagation() }>
          { this.props.filter ? this.getFilters() : null }
        </div>
      </th>
    );
  }

  cleanFiltered() {
    if (this.props.filter === undefined) {
      return;
    }

    switch (this.props.filter.type) {
    case Const.FILTER_TYPE.TEXT: {
      this.refs.textFilter.cleanFiltered();
      break;
    }
    case Const.FILTER_TYPE.REGEX: {
      this.refs.regexFilter.cleanFiltered();
      break;
    }
    case Const.FILTER_TYPE.SELECT: {
      this.refs.selectFilter.cleanFiltered();
      break;
    }
    case Const.FILTER_TYPE.NUMBER: {
      this.refs.numberFilter.cleanFiltered();
      break;
    }
    case Const.FILTER_TYPE.DATE: {
      this.refs.dateFilter.cleanFiltered();
      break;
    }
    }
  }

  applyFilter(val) {
    if (this.props.filter === undefined) return;
    switch (this.props.filter.type) {
    case Const.FILTER_TYPE.TEXT: {
      this.refs.textFilter.applyFilter(val);
      break;
    }
    case Const.FILTER_TYPE.REGEX: {
      this.refs.regexFilter.applyFilter(val);
      break;
    }
    case Const.FILTER_TYPE.SELECT: {
      this.refs.selectFilter.applyFilter(val);
      break;
    }
    case Const.FILTER_TYPE.NUMBER: {
      this.refs.numberFilter.applyFilter(val);
      break;
    }
    case Const.FILTER_TYPE.DATE: {
      this.refs.dateFilter.applyFilter(val);
      break;
    }
    }
  }
}

const filterTypeArray = [];
for (const key in Const.FILTER_TYPE) {
  filterTypeArray.push(Const.FILTER_TYPE[key]);
}

TableHeaderColumn.propTypes = {
  dataField: PropTypes.string,
  dataAlign: PropTypes.string,
  headerAlign: PropTypes.string,
  dataSort: PropTypes.bool,
  onSort: PropTypes.func,
  dataFormat: PropTypes.func,
  csvFormat: PropTypes.func,
  csvHeader: PropTypes.string,
  isKey: PropTypes.bool,
  editable: PropTypes.any,
  hidden: PropTypes.bool,
  hiddenOnInsert: PropTypes.bool,
  searchable: PropTypes.bool,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  width: PropTypes.string,
  sortFunc: PropTypes.func,
  sortFuncExtraData: PropTypes.any,
  columnClassName: PropTypes.any,
  columnTitle: PropTypes.bool,
  filterFormatted: PropTypes.bool,
  filterValue: PropTypes.func,
  sort: PropTypes.string,
  caretRender: PropTypes.func,
  formatExtraData: PropTypes.any,
  filter: PropTypes.shape({
    type: PropTypes.oneOf(filterTypeArray),
    delay: PropTypes.number,
    options: PropTypes.oneOfType([
      PropTypes.object, // for SelectFilter
      PropTypes.arrayOf(PropTypes.number) // for NumberFilter
    ]),
    numberComparators: PropTypes.arrayOf(PropTypes.string),
    emitter: PropTypes.object,
    placeholder: PropTypes.string,
    getElement: PropTypes.func,
    customFilterParameters: PropTypes.object
  }),
  sortIndicator: PropTypes.bool,
  export: PropTypes.bool
};

TableHeaderColumn.defaultProps = {
  dataAlign: 'left',
  headerAlign: undefined,
  dataSort: false,
  dataFormat: undefined,
  csvFormat: undefined,
  csvHeader: undefined,
  isKey: false,
  editable: true,
  onSort: undefined,
  hidden: false,
  hiddenOnInsert: false,
  searchable: true,
  className: '',
  columnTitle: false,
  width: null,
  sortFunc: undefined,
  columnClassName: '',
  filterFormatted: false,
  filterValue: undefined,
  sort: undefined,
  formatExtraData: undefined,
  sortFuncExtraData: undefined,
  filter: undefined,
  sortIndicator: true
};

export default TableHeaderColumn;
