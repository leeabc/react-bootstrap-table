'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PageButton = require('./PageButton.js');

var _PageButton2 = _interopRequireDefault(_PageButton);

var _Const = require('../Const');

var _Const2 = _interopRequireDefault(_Const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaginationList = function (_Component) {
  _inherits(PaginationList, _Component);

  function PaginationList(props) {
    _classCallCheck(this, PaginationList);

    var _this = _possibleConstructorReturn(this, (PaginationList.__proto__ || Object.getPrototypeOf(PaginationList)).call(this, props));

    _this.changePage = function (page) {
      var _this$props = _this.props,
          pageStartIndex = _this$props.pageStartIndex,
          prePage = _this$props.prePage,
          currPage = _this$props.currPage,
          nextPage = _this$props.nextPage,
          lastPage = _this$props.lastPage,
          firstPage = _this$props.firstPage,
          sizePerPage = _this$props.sizePerPage;


      var pageNumber = 0;
      if (page === 'prev') {
        pageNumber = currPage - 1 < pageStartIndex ? pageStartIndex : currPage - 1;
      } else if (page === 'next') {
        pageNumber = currPage + 1 > _this.lastPage ? _this.lastPage : currPage + 1;
      } else if (page === lastPage) {
        pageNumber = _this.lastPage;
      } else if (page === firstPage) {
        pageNumber = pageStartIndex;
      } else {
        pageNumber = parseInt(page, 10);
      }
      if (pageNumber !== currPage && pageNumber <= _this.totalPages && pageNumber >= 1) {
        _this.props.changePage(pageNumber, sizePerPage);
        _this.setState({ pageInput: pageNumber });
      }
    };

    _this.handlePageInput = function (e) {
      _this.setState({
        pageInput: e.target.value
      });
    };

    _this.changePageByInput = function (e) {
      if (e.key !== 'Enter') return;

      var page = _this.state.pageInput > _this.totalPages ? _this.totalPages : _this.state.pageInput;

      _this.changePage(page);
    };

    _this.changeSizePerPage = function (e) {
      e.preventDefault();

      var selectSize = parseInt(e.currentTarget.getAttribute('data-page'), 10);
      var currPage = _this.props.currPage;

      if (selectSize !== _this.props.sizePerPage) {
        _this.totalPages = Math.ceil(_this.props.dataSize / selectSize);
        _this.lastPage = _this.props.pageStartIndex + _this.totalPages - 1;
        _this.props.changePage(1, selectSize);
        _this.setState({ pageInput: 1 });
        if (_this.props.onSizePerPageList) {
          _this.props.onSizePerPageList(selectSize);
        }
      }
    };

    _this.state = { pageInput: _this.props.currPage };
    return _this;
  }

  _createClass(PaginationList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.currPage !== this.state.pageInput) {
        this.setState({ pageInput: nextProps.currPage });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          currPage = _props.currPage,
          dataSize = _props.dataSize,
          sizePerPage = _props.sizePerPage,
          sizePerPageList = _props.sizePerPageList,
          paginationShowsTotal = _props.paginationShowsTotal,
          pageStartIndex = _props.pageStartIndex,
          hideSizePerPage = _props.hideSizePerPage;


      this.totalPages = Math.ceil(dataSize / sizePerPage);
      this.lastPage = this.props.pageStartIndex + this.totalPages - 1;
      var pageBtns = this.makePage();
      var pageListStyle = {
        // override the margin-top defined in .pagination class in bootstrap.
        margin: '0px'
      };

      var sizePerPageOptions = sizePerPageList.map(function (_sizePerPage) {
        var pageText = _sizePerPage.text || _sizePerPage;
        var pageNum = _sizePerPage.value || _sizePerPage;
        var selected = pageNum === sizePerPage ? 'selected' : '';
        return _react2.default.createElement(
          'li',
          { key: pageText, className: selected, role: 'presentation' },
          _react2.default.createElement(
            'a',
            { role: 'menuitem',
              tabIndex: '-1', href: '#',
              'data-page': pageNum,
              onClick: _this2.changeSizePerPage },
            pageText
          )
        );
      });

      var offset = Math.abs(_Const2.default.PAGE_START_INDEX - pageStartIndex);
      var start = (currPage - pageStartIndex) * sizePerPage;
      start = dataSize === 0 ? 0 : start + 1;
      var to = Math.min(sizePerPage * (currPage + offset) - 1, dataSize);
      if (to >= dataSize) to--;
      var total = _react2.default.createElement(
        'span',
        null,
        'Records ',
        start,
        ' -\xA0',
        to + 1,
        ' /\xA0',
        dataSize
      );

      if (typeof paginationShowsTotal === 'function') {
        total = paginationShowsTotal(start, to, dataSize);
      }

      var dropDownStyle = {
        visibility: hideSizePerPage ? 'hidden' : 'visible'
      };

      return _react2.default.createElement(
        'div',
        { className: 'table-pagination-block' },
        _react2.default.createElement(
          'div',
          { className: 'pagination-records' },
          total,
          ' '
        ),
        _react2.default.createElement(
          'div',
          { className: 'dropdown', style: dropDownStyle },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-xs btn-link dropdown-toggle',
              type: 'button', id: 'pageDropDown', 'data-toggle': 'dropdown',
              'aria-expanded': 'true' },
            sizePerPage,
            ' per page',
            _react2.default.createElement(
              'span',
              null,
              ' ',
              _react2.default.createElement('span', { className: 'caret' })
            )
          ),
          _react2.default.createElement(
            'ul',
            { className: 'dropdown-menu dropdown-menu-multi-select', role: 'menu' },
            sizePerPageOptions
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'pagination-input' },
          _react2.default.createElement('input', { type: 'text', onKeyPress: this.changePageByInput, onChange: this.handlePageInput, value: this.state.pageInput }),
          ' /',
          this.totalPages
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'ul',
            { className: 'pagination', style: pageListStyle },
            pageBtns
          )
        )
      );
    }
  }, {
    key: 'makePage',
    value: function makePage() {
      var pages = [{ node: _react2.default.createElement('span', { className: 'fa fa-angle-left' }), key: 'prev' }, { node: _react2.default.createElement('span', { className: 'fa fa-angle-right' }), key: 'next' }];
      return pages.map(function (page) {
        var disabled = false;
        if (this.props.currPage === this.props.pageStartIndex && page.key === 'prev') {
          disabled = true;
        }
        if (this.props.currPage === this.lastPage && page.key === 'next') {
          disabled = true;
        }
        return _react2.default.createElement(
          _PageButton2.default,
          { key: page.key,
            btnKey: page.key,
            changePage: this.changePage,
            disable: disabled },
          page.node
        );
      }, this);
    }
  }]);

  return PaginationList;
}(_react.Component);

PaginationList.propTypes = {
  currPage: _propTypes2.default.number,
  sizePerPage: _propTypes2.default.number,
  dataSize: _propTypes2.default.number,
  changePage: _propTypes2.default.func,
  sizePerPageList: _propTypes2.default.array,
  paginationShowsTotal: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
  paginationSize: _propTypes2.default.number,
  remote: _propTypes2.default.bool,
  onSizePerPageList: _propTypes2.default.func,
  prePage: _propTypes2.default.string,
  pageStartIndex: _propTypes2.default.number,
  hideSizePerPage: _propTypes2.default.bool
};

PaginationList.defaultProps = {
  sizePerPage: _Const2.default.SIZE_PER_PAGE,
  pageStartIndex: _Const2.default.PAGE_START_INDEX
};

exports.default = PaginationList;