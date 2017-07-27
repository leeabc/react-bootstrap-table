'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _Date = require('./filters/Date');

var _Date2 = _interopRequireDefault(_Date);

var _Text = require('./filters/Text');

var _Text2 = _interopRequireDefault(_Text);

var _Regex = require('./filters/Regex');

var _Regex2 = _interopRequireDefault(_Regex);

var _Select = require('./filters/Select');

var _Select2 = _interopRequireDefault(_Select);

var _Number = require('./filters/Number');

var _Number2 = _interopRequireDefault(_Number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint default-case: 0 */
/* eslint guard-for-in: 0 */


var TableHeaderColumn = function (_Component) {
  _inherits(TableHeaderColumn, _Component);

  function TableHeaderColumn(props) {
    _classCallCheck(this, TableHeaderColumn);

    var _this = _possibleConstructorReturn(this, (TableHeaderColumn.__proto__ || Object.getPrototypeOf(TableHeaderColumn)).call(this, props));

    _this.handleColumnClick = function () {
      if (!_this.props.dataSort) return;
      var order = _this.props.sort === _Const2.default.SORT_DESC ? _Const2.default.SORT_ASC : _Const2.default.SORT_DESC;
      _this.props.onSort(order, _this.props.dataField);
    };

    _this.handleFilter = _this.handleFilter.bind(_this);
    return _this;
  }

  _createClass(TableHeaderColumn, [{
    key: 'handleFilter',
    value: function handleFilter(value, type) {
      this.props.filter.emitter.handleFilter(this.props.dataField, value, type);
    }
  }, {
    key: 'getFilters',
    value: function getFilters() {
      switch (this.props.filter.type) {
        case _Const2.default.FILTER_TYPE.TEXT:
          {
            return _react2.default.createElement(_Text2.default, _extends({ ref: 'textFilter' }, this.props.filter, {
              columnName: this.props.children, filterHandler: this.handleFilter }));
          }
        case _Const2.default.FILTER_TYPE.REGEX:
          {
            return _react2.default.createElement(_Regex2.default, _extends({ ref: 'regexFilter' }, this.props.filter, {
              columnName: this.props.children, filterHandler: this.handleFilter }));
          }
        case _Const2.default.FILTER_TYPE.SELECT:
          {
            return _react2.default.createElement(_Select2.default, _extends({ ref: 'selectFilter' }, this.props.filter, {
              columnName: this.props.children, filterHandler: this.handleFilter }));
          }
        case _Const2.default.FILTER_TYPE.NUMBER:
          {
            return _react2.default.createElement(_Number2.default, _extends({ ref: 'numberFilter' }, this.props.filter, {
              columnName: this.props.children, filterHandler: this.handleFilter }));
          }
        case _Const2.default.FILTER_TYPE.DATE:
          {
            return _react2.default.createElement(_Date2.default, _extends({ ref: 'dateFilter' }, this.props.filter, {
              columnName: this.props.children, filterHandler: this.handleFilter }));
          }
        case _Const2.default.FILTER_TYPE.CUSTOM:
          {
            return this.props.filter.getElement(this.handleFilter, this.props.filter.customFilterParameters);
          }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs['header-col'].setAttribute('data-field', this.props.dataField);
    }
  }, {
    key: 'render',
    value: function render() {
      var defaultCaret = void 0;
      var _props = this.props,
          dataAlign = _props.dataAlign,
          dataField = _props.dataField,
          headerAlign = _props.headerAlign,
          hidden = _props.hidden,
          sort = _props.sort,
          dataSort = _props.dataSort,
          children = _props.children,
          caretRender = _props.caretRender,
          className = _props.className;

      var thStyle = {
        textAlign: headerAlign || dataAlign,
        display: hidden ? 'none' : null
      };

      var classes = this.props.className + ' ' + (dataSort ? 'sort-column sortable' : '');
      classes += sort ? ' sort-' + sort : '';

      var title = typeof children === 'string' ? { title: children } : null;
      var childrenContent = dataSort ? _react2.default.createElement(
        'div',
        { className: 'sort-indicator' },
        children
      ) : children;

      return _react2.default.createElement(
        'th',
        _extends({ ref: 'header-col',
          className: classes,
          style: thStyle,
          onClick: this.handleColumnClick
        }, title),
        childrenContent,
        _react2.default.createElement(
          'div',
          { onClick: function onClick(e) {
              return e.stopPropagation();
            } },
          this.props.filter ? this.getFilters() : null
        )
      );
    }
  }, {
    key: 'cleanFiltered',
    value: function cleanFiltered() {
      if (this.props.filter === undefined) {
        return;
      }

      switch (this.props.filter.type) {
        case _Const2.default.FILTER_TYPE.TEXT:
          {
            this.refs.textFilter.cleanFiltered();
            break;
          }
        case _Const2.default.FILTER_TYPE.REGEX:
          {
            this.refs.regexFilter.cleanFiltered();
            break;
          }
        case _Const2.default.FILTER_TYPE.SELECT:
          {
            this.refs.selectFilter.cleanFiltered();
            break;
          }
        case _Const2.default.FILTER_TYPE.NUMBER:
          {
            this.refs.numberFilter.cleanFiltered();
            break;
          }
        case _Const2.default.FILTER_TYPE.DATE:
          {
            this.refs.dateFilter.cleanFiltered();
            break;
          }
      }
    }
  }, {
    key: 'applyFilter',
    value: function applyFilter(val) {
      if (this.props.filter === undefined) return;
      switch (this.props.filter.type) {
        case _Const2.default.FILTER_TYPE.TEXT:
          {
            this.refs.textFilter.applyFilter(val);
            break;
          }
        case _Const2.default.FILTER_TYPE.REGEX:
          {
            this.refs.regexFilter.applyFilter(val);
            break;
          }
        case _Const2.default.FILTER_TYPE.SELECT:
          {
            this.refs.selectFilter.applyFilter(val);
            break;
          }
        case _Const2.default.FILTER_TYPE.NUMBER:
          {
            this.refs.numberFilter.applyFilter(val);
            break;
          }
        case _Const2.default.FILTER_TYPE.DATE:
          {
            this.refs.dateFilter.applyFilter(val);
            break;
          }
      }
    }
  }]);

  return TableHeaderColumn;
}(_react.Component);

var filterTypeArray = [];
for (var key in _Const2.default.FILTER_TYPE) {
  filterTypeArray.push(_Const2.default.FILTER_TYPE[key]);
}

TableHeaderColumn.propTypes = {
  dataField: _propTypes2.default.string,
  dataAlign: _propTypes2.default.string,
  headerAlign: _propTypes2.default.string,
  dataSort: _propTypes2.default.bool,
  onSort: _propTypes2.default.func,
  dataFormat: _propTypes2.default.func,
  csvFormat: _propTypes2.default.func,
  csvHeader: _propTypes2.default.string,
  isKey: _propTypes2.default.bool,
  editable: _propTypes2.default.any,
  hidden: _propTypes2.default.bool,
  hiddenOnInsert: _propTypes2.default.bool,
  searchable: _propTypes2.default.bool,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  width: _propTypes2.default.string,
  sortFunc: _propTypes2.default.func,
  sortFuncExtraData: _propTypes2.default.any,
  columnClassName: _propTypes2.default.any,
  columnTitle: _propTypes2.default.bool,
  filterFormatted: _propTypes2.default.bool,
  filterValue: _propTypes2.default.func,
  sort: _propTypes2.default.string,
  caretRender: _propTypes2.default.func,
  formatExtraData: _propTypes2.default.any,
  filter: _propTypes2.default.shape({
    type: _propTypes2.default.oneOf(filterTypeArray),
    delay: _propTypes2.default.number,
    options: _propTypes2.default.oneOfType([_propTypes2.default.object, // for SelectFilter
    _propTypes2.default.arrayOf(_propTypes2.default.number) // for NumberFilter
    ]),
    numberComparators: _propTypes2.default.arrayOf(_propTypes2.default.string),
    emitter: _propTypes2.default.object,
    placeholder: _propTypes2.default.string,
    getElement: _propTypes2.default.func,
    customFilterParameters: _propTypes2.default.object
  }),
  sortIndicator: _propTypes2.default.bool,
  export: _propTypes2.default.bool
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

exports.default = TableHeaderColumn;