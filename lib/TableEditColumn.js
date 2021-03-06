'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Editor = require('./Editor');

var _Editor2 = _interopRequireDefault(_Editor);

var _Notification = require('./Notification.js');

var _Notification2 = _interopRequireDefault(_Notification);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableEditColumn = function (_Component) {
  _inherits(TableEditColumn, _Component);

  function TableEditColumn(props) {
    _classCallCheck(this, TableEditColumn);

    var _this = _possibleConstructorReturn(this, (TableEditColumn.__proto__ || Object.getPrototypeOf(TableEditColumn)).call(this, props));

    _this.handleKeyPress = function (e) {
      if (e.keyCode === 13) {
        // Pressed ENTER
        var value = e.currentTarget.type === 'checkbox' ? _this._getCheckBoxValue(e) : e.currentTarget.value;

        if (!_this.validator(value)) {
          return;
        }
        _this.props.completeEdit(value, _this.props.rowIndex, _this.props.colIndex);
      } else if (e.keyCode === 27) {
        _this.props.completeEdit(null, _this.props.rowIndex, _this.props.colIndex);
      } else if (e.type === 'click' && !_this.props.blurToSave) {
        // textarea click save button
        var _value = e.target.parentElement.firstChild.value;
        if (!_this.validator(_value)) {
          return;
        }
        _this.props.completeEdit(_value, _this.props.rowIndex, _this.props.colIndex);
      }
    };

    _this.handleBlur = function (e) {
      e.stopPropagation();
      if (_this.props.blurToSave) {
        var value = e.currentTarget.type === 'checkbox' ? _this._getCheckBoxValue(e) : e.currentTarget.value;
        if (!_this.validator(value)) {
          return;
        }
        _this.props.completeEdit(value, _this.props.rowIndex, _this.props.colIndex);
      }
    };

    _this.handleCustomUpdate = function (value) {
      _this.props.completeEdit(value, _this.props.rowIndex, _this.props.colIndex);
    };

    _this.timeouteClear = 0;
    _this.state = {
      shakeEditor: false
    };
    return _this;
  }

  _createClass(TableEditColumn, [{
    key: 'validator',


    // modified by iuculanop
    // BEGIN
    value: function validator(value) {
      var ts = this;
      var valid = true;
      if (ts.props.editable.validator) {
        var input = ts.refs.inputRef;
        var checkVal = ts.props.editable.validator(value);
        var responseType = typeof checkVal === 'undefined' ? 'undefined' : _typeof(checkVal);
        if (responseType !== 'object' && checkVal !== true) {
          valid = false;
          ts.refs.notifier.notice('error', checkVal, 'Pressed ESC can cancel');
        } else if (responseType === 'object' && checkVal.isValid !== true) {
          valid = false;
          ts.refs.notifier.notice(checkVal.notification.type, checkVal.notification.msg, checkVal.notification.title);
        }
        if (!valid) {
          // animate input
          ts.clearTimeout();
          ts.setState({ shakeEditor: true });
          ts.timeouteClear = setTimeout(function () {
            ts.setState({ shakeEditor: false });
          }, 300);
          input.focus();
          return valid;
        }
      }
      return valid;
    }
    // END

  }, {
    key: 'clearTimeout',
    value: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function () {
      if (this.timeouteClear !== 0) {
        clearTimeout(this.timeouteClear);
        this.timeouteClear = 0;
      }
    })
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.inputRef.focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearTimeout();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          editable = _props.editable,
          format = _props.format,
          customEditor = _props.customEditor;
      var shakeEditor = this.state.shakeEditor;

      var attr = {
        ref: 'inputRef',
        onKeyDown: this.handleKeyPress,
        onBlur: this.handleBlur
      };
      var fieldValue = this.props.fieldValue;
      // put placeholder if exist

      editable.placeholder && (attr.placeholder = editable.placeholder);

      var editorClass = (0, _classnames2.default)({ 'animated': shakeEditor, 'shake': shakeEditor });
      var cellEditor = void 0;
      if (customEditor) {
        var customEditorProps = _extends({
          row: this.props.row
        }, attr, {
          defaultValue: fieldValue || ''
        }, customEditor.customEditorParameters);
        cellEditor = customEditor.getElement(this.handleCustomUpdate, customEditorProps);
      } else {
        fieldValue = fieldValue === 0 ? '0' : fieldValue;
        cellEditor = (0, _Editor2.default)(editable, attr, format, editorClass, fieldValue || '');
      }

      return _react2.default.createElement(
        'td',
        { ref: 'td', style: { position: 'relative' } },
        cellEditor,
        _react2.default.createElement(_Notification2.default, { ref: 'notifier' })
      );
    }
  }, {
    key: '_getCheckBoxValue',
    value: function _getCheckBoxValue(e) {
      var value = '';
      var values = e.currentTarget.value.split(':');
      value = e.currentTarget.checked ? values[0] : values[1];
      return value;
    }
  }]);

  return TableEditColumn;
}(_react.Component);

TableEditColumn.propTypes = {
  completeEdit: _propTypes2.default.func,
  rowIndex: _propTypes2.default.number,
  colIndex: _propTypes2.default.number,
  blurToSave: _propTypes2.default.bool,
  editable: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
  format: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
  row: _propTypes2.default.any,
  fieldValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object])
};

exports.default = TableEditColumn;