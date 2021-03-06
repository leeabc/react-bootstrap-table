'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Const = require('./Const');

var _Const2 = _interopRequireDefault(_Const);

var _TableRow = require('./TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableColumn = require('./TableColumn');

var _TableColumn2 = _interopRequireDefault(_TableColumn);

var _TableEditColumn = require('./TableEditColumn');

var _TableEditColumn2 = _interopRequireDefault(_TableEditColumn);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isFun = function isFun(obj) {
  return obj && typeof obj === 'function';
};

var TableBody = function (_Component) {
  _inherits(TableBody, _Component);

  function TableBody(props) {
    _classCallCheck(this, TableBody);

    var _this = _possibleConstructorReturn(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).call(this, props));

    _this.handleRowMouseOut = function (rowIndex, event) {
      var targetRow = _this.props.data[rowIndex];
      _this.props.onRowMouseOut(targetRow, event);
    };

    _this.handleRowMouseOver = function (rowIndex, event) {
      var targetRow = _this.props.data[rowIndex];
      _this.props.onRowMouseOver(targetRow, event);
    };

    _this.handleRowClick = function (rowIndex) {
      var selectedRow = void 0;
      var _this$props = _this.props,
          data = _this$props.data,
          onRowClick = _this$props.onRowClick;

      data.forEach(function (row, i) {
        if (i === rowIndex - 1) {
          selectedRow = row;
        }
      });
      onRowClick(selectedRow);
    };

    _this.handleSelectRow = function (rowIndex, isSelected, e) {
      var selectedRow = void 0;
      var _this$props2 = _this.props,
          data = _this$props2.data,
          onSelectRow = _this$props2.onSelectRow;

      data.forEach(function (row, i) {
        if (i === rowIndex - 1) {
          selectedRow = row;
          return false;
        }
      });
      onSelectRow(selectedRow, isSelected, e);
    };

    _this.handleSelectRowColumChange = function (e, rowIndex) {
      if (!_this.props.selectRow.clickToSelect || !_this.props.selectRow.clickToSelectAndEditCell) {
        _this.handleSelectRow(rowIndex + 1, e.currentTarget.checked, e);
      }
    };

    _this.handleEditCell = function (rowIndex, columnIndex, e) {
      if (_this._isSelectRowDefined()) {
        columnIndex--;
        if (_this.props.selectRow.hideSelectColumn) columnIndex++;
      }
      rowIndex--;
      var stateObj = {
        currEditCell: {
          rid: rowIndex,
          cid: columnIndex
        }
      };

      if (_this.props.selectRow.clickToSelectAndEditCell && _this.props.cellEdit.mode !== _Const2.default.CELL_EDIT_DBCLICK) {
        var selected = _this.props.selectedRowKeys.indexOf(_this.props.data[rowIndex][_this.props.keyField]) !== -1;
        _this.handleSelectRow(rowIndex + 1, !selected, e);
      }
      _this.setState(stateObj);
    };

    _this.handleCompleteEditCell = function (newVal, rowIndex, columnIndex) {
      _this.setState({ currEditCell: null });
      if (newVal !== null) {
        _this.props.cellEdit.__onCompleteEdit__(newVal, rowIndex, columnIndex);
      }
    };

    _this.state = {
      currEditCell: null
    };
    return _this;
  }

  _createClass(TableBody, [{
    key: 'render',
    value: function render() {
      var tableClasses = (0, _classnames2.default)('table ddes-table', {
        'table-striped': this.props.striped,
        'table-bordered': this.props.bordered,
        'table-hover': this.props.hover,
        'table-condensed': this.props.condensed
      }, this.props.tableBodyClass);

      var unselectable = this.props.selectRow.unselectable || [];
      var isSelectRowDefined = this._isSelectRowDefined();
      var tableHeader = this.renderTableHeader(isSelectRowDefined);
      var inputType = this.props.selectRow.mode === _Const2.default.ROW_SELECT_SINGLE ? 'radio' : 'checkbox';
      var CustomComponent = this.props.selectRow.customComponent;

      var tableRows = this.props.data.map(function (data, r) {
        var tableColumns = this.props.columns.map(function (column, i) {
          var fieldValue = data[column.name];
          if (column.name !== this.props.keyField && // Key field can't be edit
          column.editable && // column is editable? default is true, user can set it false
          this.state.currEditCell !== null && this.state.currEditCell.rid === r && this.state.currEditCell.cid === i) {
            var editable = column.editable;
            var format = column.format ? function (value) {
              return column.format(value, data, column.formatExtraData, r).replace(/<.*?>/g, '');
            } : false;
            if (isFun(column.editable)) {
              editable = column.editable(fieldValue, data, r, i);
            }

            return _react2.default.createElement(_TableEditColumn2.default, {
              completeEdit: this.handleCompleteEditCell
              // add by bluespring for column editor customize
              , editable: editable,
              customEditor: column.customEditor,
              format: column.format ? format : false,
              key: i,
              blurToSave: this.props.cellEdit.blurToSave,
              rowIndex: r,
              colIndex: i,
              row: data,
              fieldValue: fieldValue });
          } else {
            // add by bluespring for className customize
            var columnChild = fieldValue && fieldValue.toString();
            var columnTitle = null;
            var tdClassName = column.className;
            if (isFun(column.className)) {
              tdClassName = column.className(fieldValue, data, r, i);
            }

            if (typeof column.format !== 'undefined') {
              var formattedValue = column.format(fieldValue, data, column.formatExtraData, r);
              if (!_react2.default.isValidElement(formattedValue)) {
                columnChild = _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: formattedValue } });
              } else {
                columnChild = formattedValue;
                columnTitle = column.columnTitle && formattedValue ? formattedValue.toString() : null;
              }
            } else {
              columnTitle = column.columnTitle && fieldValue ? fieldValue.toString() : null;
            }
            return _react2.default.createElement(
              _TableColumn2.default,
              { key: i,
                dataAlign: column.align,
                className: tdClassName,
                columnTitle: columnTitle,
                cellEdit: this.props.cellEdit,
                hidden: column.hidden,
                onEdit: this.handleEditCell,
                width: column.width },
              columnChild
            );
          }
        }, this);
        var key = data[this.props.keyField];
        var disable = unselectable.indexOf(key) !== -1;
        var selected = this.props.selectedRowKeys.indexOf(key) !== -1;
        var selectRowColumn = isSelectRowDefined && !this.props.selectRow.hideSelectColumn ? this.renderSelectRowColumn(selected, inputType, disable, CustomComponent, r) : null;
        // add by bluespring for className customize
        var trClassName = this.props.trClassName;
        if (isFun(this.props.trClassName)) {
          trClassName = this.props.trClassName(data, r);
        }
        return _react2.default.createElement(
          _TableRow2.default,
          { isSelected: selected, key: key, className: trClassName,
            selectRow: isSelectRowDefined ? this.props.selectRow : undefined,
            enableCellEdit: this.props.cellEdit.mode !== _Const2.default.CELL_EDIT_NONE,
            onRowClick: this.handleRowClick,
            onRowMouseOver: this.handleRowMouseOver,
            onRowMouseOut: this.handleRowMouseOut,
            onSelectRow: this.handleSelectRow,
            unselectableRow: disable },
          selectRowColumn,
          tableColumns
        );
      }, this);

      var emptyTableMask = null;
      var bodyContainerClass = 'react-bs-container-body';

      if (tableRows.length === 0) {
        emptyTableMask = _react2.default.createElement(
          'div',
          { className: 'empty-table-mask' },
          this.props.noDataText || _Const2.default.NO_DATA_TEXT
        );
        tableClasses += ' react-bs-table-no-data hide';
        bodyContainerClass += ' empty-table-container';

        tableRows.push(_react2.default.createElement(
          _TableRow2.default,
          { key: '##table-empty##', className: 'react-bs-table-no-data-tr' },
          _react2.default.createElement(
            'td',
            { colSpan: this.props.columns.length + (isSelectRowDefined ? 1 : 0),
              className: 'react-bs-table-no-data-td' },
            this.props.noDataText || _Const2.default.NO_DATA_TEXT
          )
        ));
      }

      return _react2.default.createElement(
        'div',
        { ref: 'container',
          className: (0, _classnames2.default)(bodyContainerClass, this.props.bodyContainerClass),
          style: this.props.style },
        emptyTableMask,
        _react2.default.createElement(
          'table',
          { className: tableClasses },
          tableHeader,
          _react2.default.createElement(
            'tbody',
            { ref: 'tbody' },
            tableRows
          )
        )
      );
    }
  }, {
    key: 'renderTableHeader',
    value: function renderTableHeader(isSelectRowDefined) {
      var selectRowHeader = null;

      if (isSelectRowDefined) {
        var style = {
          width: 33,
          minWidth: 33
        };
        if (!this.props.selectRow.hideSelectColumn) {
          selectRowHeader = _react2.default.createElement('col', { style: style, key: -1 });
        }
      }
      var theader = this.props.columns.map(function (column, i) {
        var style = {
          display: column.hidden ? 'none' : null
        };
        if (column.width) {
          var width = parseInt(column.width, 10);
          style.width = width;
          /** add min-wdth to fix user assign column width
          not eq offsetWidth in large column table **/
          style.minWidth = width;
        }
        return _react2.default.createElement('col', { style: style, key: i, className: column.className });
      });

      return _react2.default.createElement(
        'colgroup',
        { ref: 'header' },
        selectRowHeader,
        theader
      );
    }
  }, {
    key: 'renderSelectRowColumn',
    value: function renderSelectRowColumn(selected, inputType, disabled) {
      var _this2 = this;

      var CustomComponent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var rowIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      return _react2.default.createElement(
        _TableColumn2.default,
        { dataAlign: 'center', className: 'col-chkbox' },
        _react2.default.createElement(
          'div',
          { className: 'tm-custom-checkbox' },
          _react2.default.createElement('input', { type: inputType, checked: selected, disabled: disabled,
            onChange: function onChange(e) {
              return _this2.handleSelectRowColumChange(e, e.currentTarget.parentElement.parentElement.parentElement.rowIndex);
            } }),
          _react2.default.createElement('label', null)
        )
      );
    }
  }, {
    key: '_isSelectRowDefined',
    value: function _isSelectRowDefined() {
      return this.props.selectRow.mode === _Const2.default.ROW_SELECT_SINGLE || this.props.selectRow.mode === _Const2.default.ROW_SELECT_MULTI;
    }
  }]);

  return TableBody;
}(_react.Component);

TableBody.propTypes = {
  data: _propTypes2.default.array,
  columns: _propTypes2.default.array,
  striped: _propTypes2.default.bool,
  bordered: _propTypes2.default.bool,
  hover: _propTypes2.default.bool,
  condensed: _propTypes2.default.bool,
  keyField: _propTypes2.default.string,
  selectedRowKeys: _propTypes2.default.array,
  onRowClick: _propTypes2.default.func,
  onSelectRow: _propTypes2.default.func,
  noDataText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  style: _propTypes2.default.object,
  tableBodyClass: _propTypes2.default.string,
  bodyContainerClass: _propTypes2.default.string
};
exports.default = TableBody;