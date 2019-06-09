"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BookmarkListRow = function (_React$Component) {
    _inherits(BookmarkListRow, _React$Component);

    function BookmarkListRow(props) {
        _classCallCheck(this, BookmarkListRow);

        var _this = _possibleConstructorReturn(this, (BookmarkListRow.__proto__ || Object.getPrototypeOf(BookmarkListRow)).call(this, props));

        _this.nameChanged = _this.nameChanged.bind(_this);
        _this.saveList = _this.saveList.bind(_this);
        _this.deleteList = _this.deleteList.bind(_this);
        _this.toggleEdit = _this.toggleEdit.bind(_this);
        return _this;
    }

    _createClass(BookmarkListRow, [{
        key: "toggleEdit",
        value: function toggleEdit() {
            this.props.onToggleEdit(this.props.SpellList);
        }
    }, {
        key: "saveList",
        value: function saveList() {
            this.props.onSaveList(this.props.SpellList);
        }
    }, {
        key: "deleteList",
        value: function deleteList() {
            this.props.onDeleteList(this.props.SpellList);
        }
    }, {
        key: "nameChanged",
        value: function nameChanged(event) {
            this.props.onNameChange(this.props.SpellList, event.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "tr",
                { className: "spellListRow" },
                _react2.default.createElement(
                    "td",
                    null,
                    _react2.default.createElement("input", { className: "form-control", type: "text", name: "name", value: this.props.SpellList.name, onChange: this.nameChanged })
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    this.props.SpellList.spellCount
                ),
                _react2.default.createElement(
                    "td",
                    null,
                    _react2.default.createElement(
                        "a",
                        { className: "btn" + (this.props.isEditList ? " editList" : ""), onClick: this.toggleEdit },
                        this.props.isEditList ? _react2.default.createElement("i", { className: "fas fa-check-circle" }) : _react2.default.createElement("i", { className: "far fa-circle" })
                    )
                ),
                _react2.default.createElement(
                    "td",
                    { className: "actions" },
                    this.props.canDelete && !this.props.isEditList && _react2.default.createElement(
                        "a",
                        { className: "btn btn-outline-danger", onClick: this.deleteList },
                        _react2.default.createElement("i", { className: "fas fa-trash-alt" })
                    )
                )
            );
        }
    }]);

    return BookmarkListRow;
}(_react2.default.Component);

exports.default = BookmarkListRow;
;