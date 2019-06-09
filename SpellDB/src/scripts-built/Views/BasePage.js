'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SpellList = require('./Spells/SpellList.js');

var _SpellList2 = _interopRequireDefault(_SpellList);

var _BookmarkList = require('./Bookmarks/BookmarkList.js');

var _BookmarkList2 = _interopRequireDefault(_BookmarkList);

var _QuickRefIndex = require('./QuickRef/QuickRefIndex.js');

var _QuickRefIndex2 = _interopRequireDefault(_QuickRefIndex);

var _About = require('./About/About.js');

var _About2 = _interopRequireDefault(_About);

var _Navigation = require('./Navigation.js');

var _Navigation2 = _interopRequireDefault(_Navigation);

var _BookmarkManager = require('./../BookmarkManager.js');

var _BookmarkManager2 = _interopRequireDefault(_BookmarkManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bookmarkMgr = new _BookmarkManager2.default();

var BasePage = function (_React$PureComponent) {
    _inherits(BasePage, _React$PureComponent);

    function BasePage(props) {
        _classCallCheck(this, BasePage);

        var _this = _possibleConstructorReturn(this, (BasePage.__proto__ || Object.getPrototypeOf(BasePage)).call(this, props));

        _this.state = {
            "activePage": "spells"
        };
        _this.navClick = _this.navClick.bind(_this);
        return _this;
    }

    _createClass(BasePage, [{
        key: 'navClick',
        value: function navClick(name, page) {
            this.setState({
                "activePage": page
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var pageContent = null;
            switch (this.state.activePage) {
                case "spells":
                    pageContent = _react2.default.createElement(_SpellList2.default, { bookmarkManager: bookmarkMgr });break;
                case "bookmarks":
                    pageContent = _react2.default.createElement(_BookmarkList2.default, { bookmarkManager: bookmarkMgr });break;
                case "quickref":
                    pageContent = _react2.default.createElement(_QuickRefIndex2.default, null);break;
                case "about":
                    pageContent = _react2.default.createElement(_About2.default, null);break;
                default:
                    pageContent = _react2.default.createElement(
                        'div',
                        null,
                        'Page To Be Created'
                    );break;
            }

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Navigation2.default, { onNavClick: this.navClick, activePage: this.state.activePage }),
                pageContent
            );
        }
    }]);

    return BasePage;
}(_react2.default.PureComponent);

exports.default = BasePage;