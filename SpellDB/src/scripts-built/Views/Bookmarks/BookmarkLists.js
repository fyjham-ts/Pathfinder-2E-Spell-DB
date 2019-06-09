'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _BookmarkListRow = require('./BookmarkListRow');

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
            'lists': [],
            'editList': null
        };
        _this.onToggleEdit = _this.onToggleEdit.bind(_this);
        _this.onNameChange = _this.onNameChange.bind(_this);
        _this.onDeleteList = _this.onDeleteList.bind(_this);
        _this.onSaveList = _this.onSaveList.bind(_this);
        _this.onLoadList = _this.onLoadList.bind(_this);
        _this.onAddList = _this.onAddList.bind(_this);
        _this.bindIpcEvents();
        return _this;
    }

    _createClass(BookmarkList, [{
        key: 'onToggleEdit',
        value: function onToggleEdit(list) {
            if (this.state.editList != list.id) ipcRenderer.send("spelllists-seteditlist", list.id);
        }
    }, {
        key: 'onSaveList',
        value: function onSaveList(list) {
            remote.dialog.showSaveDialog({
                "defaultPath": list.name + ".json",
                "filters": [{ "name": "SpellDB Files", "extensions": ["json"] }]
            }, function (fileName) {
                if (fileName) ipcRenderer.send("spelllists-savespelllist", list.id, fileName);
            });
        }
    }, {
        key: 'onLoadList',
        value: function onLoadList(list) {
            remote.dialog.showOpenDialog({
                "filters": [{ "name": "SpellDB files", "extensions": ["json"] }]
            }, function (fileName) {
                if (fileName && fileName[0]) ipcRenderer.send("spelllists-loadspelllist", fileName[0]);
            });
        }
    }, {
        key: 'onDeleteList',
        value: function onDeleteList(list) {
            ipcRenderer.send("spelllists-deletespelllist", list.id);
        }
    }, {
        key: 'onAddList',
        value: function onAddList() {
            ipcRenderer.send("spelllists-newlist");
        }
    }, {
        key: 'onNameChange',
        value: function onNameChange(list, value) {
            ipcRenderer.send("spelllists-updatelistname", list.id, value);
        }
    }, {
        key: 'bindIpcEvents',
        value: function bindIpcEvents() {
            var _this2 = this;

            ipcRenderer.on("background-error", function (ev, msg) {
                alert(msg);
            });
            ipcRenderer.on('spelllists-dataupdate', function (ev, lists) {
                _this2.setState({ 'lists': lists });
            });
            ipcRenderer.on('spelllists-editlistupdate', function (ev, id) {
                _this2.setState({ 'editList': id });
            });
            ipcRenderer.send("spelllists-load");
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

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
                                canDelete: _this3.state.lists.length > 1,
                                isEditList: l.id == _this3.state.editList,
                                onNameChange: _this3.onNameChange,
                                onDeleteList: _this3.onDeleteList,
                                onSaveList: _this3.onSaveList,
                                onToggleEdit: _this3.onToggleEdit });
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
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-secondary', onClick: this.onLoadList },
                        _react2.default.createElement('i', { className: 'fas fa-file-upload' }),
                        '\xA0\xA0Load From File'
                    )
                )
            );
        }
    }]);

    return BookmarkList;
}(_react2.default.Component);

exports.default = BookmarkList;
;