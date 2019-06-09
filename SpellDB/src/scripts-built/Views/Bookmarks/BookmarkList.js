'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _BookmarkListRow = require('./BookmarkListRow.js');

var _BookmarkListRow2 = _interopRequireDefault(_BookmarkListRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BookmarkList = function (_React$Component) {
    _inherits(BookmarkList, _React$Component);

    function BookmarkList(props) {
        _classCallCheck(this, BookmarkList);

        var _this = _possibleConstructorReturn(this, (BookmarkList.__proto__ || Object.getPrototypeOf(BookmarkList)).call(this, props));

        _this.state = {
            'lists': _this.props.bookmarkManager.getBookmarkLists(),
            'editList': _this.props.bookmarkManager.getActiveBookmarkList().id
        };
        _this.onToggleEdit = _this.onToggleEdit.bind(_this);
        _this.onNameChange = _this.onNameChange.bind(_this);
        _this.onDeleteList = _this.onDeleteList.bind(_this);
        _this.onSaveList = _this.onSaveList.bind(_this);
        _this.onLoadList = _this.onLoadList.bind(_this);
        _this.onAddList = _this.onAddList.bind(_this);

        _this.bookmarkListUpdate = _this.bookmarkListUpdate.bind(_this);
        _this.activeBookmarkListUpdate = _this.activeBookmarkListUpdate.bind(_this);

        _this.props.bookmarkManager.on(_this.props.bookmarkManager.events.dataUpdate, _this.bookmarkListUpdate);
        _this.props.bookmarkManager.on(_this.props.bookmarkManager.events.activeListUpdate, _this.activeBookmarkListUpdate);
        _this.componentWillUnmount = function () {
            this.props.bookmarkManager.off(this.props.bookmarkManager.events.dataUpdate, this.bookmarkListUpdate);
            this.props.bookmarkManager.off(this.props.bookmarkManager.events.activeListUpdate, this.activeBookmarkListUpdate);
        }.bind(_this);
        return _this;
    }

    _createClass(BookmarkList, [{
        key: 'bookmarkListUpdate',
        value: function bookmarkListUpdate(ev, args) {
            this.setState({ 'lists': args });
        }
    }, {
        key: 'activeBookmarkListUpdate',
        value: function activeBookmarkListUpdate(ev, args) {
            this.setState({ 'editList': args.id });
        }
    }, {
        key: 'onToggleEdit',
        value: function onToggleEdit(list) {
            if (this.state.editList != list.id) {
                this.props.bookmarkManager.setActiveList(list.id);
            }
        }
    }, {
        key: 'onSaveList',
        value: function onSaveList(list) {
            // TODO
        }
    }, {
        key: 'onLoadList',
        value: function onLoadList(list) {
            //TODO
        }
    }, {
        key: 'onDeleteList',
        value: function onDeleteList(list) {
            this.props.bookmarkManager.deleteList(list.id);
        }
    }, {
        key: 'onAddList',
        value: function onAddList() {
            this.props.bookmarkManager.newList();
        }
    }, {
        key: 'onNameChange',
        value: function onNameChange(list, value) {
            this.props.bookmarkManager.updateListName(list.id, value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'spellListConfig' },
                _react2.default.createElement(
                    'table',
                    { className: 'table spellListTable' },
                    _react2.default.createElement(
                        'thead',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            _react2.default.createElement(
                                'th',
                                null,
                                'List Name'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                'Spells'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                'Editing'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                '\xA0'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        this.state.lists.map(function (l) {
                            return _react2.default.createElement(_BookmarkListRow2.default, {
                                key: l.id,
                                SpellList: l,
                                canDelete: _this2.state.lists.length > 1,
                                isEditList: l.id == _this2.state.editList,
                                onNameChange: _this2.onNameChange,
                                onDeleteList: _this2.onDeleteList,
                                onSaveList: _this2.onSaveList,
                                onToggleEdit: _this2.onToggleEdit });
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'global-actions' },
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-success', onClick: this.onAddList },
                        _react2.default.createElement('i', { className: 'fas fa-plus' }),
                        '\xA0\xA0Create New List'
                    )
                )
            );
        }
    }]);

    return BookmarkList;
}(_react2.default.Component);

exports.default = BookmarkList;
;