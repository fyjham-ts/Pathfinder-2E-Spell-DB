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

var links = [{ "name": "Spells", "page": "spells" }, { "name": "Bookmark Manager", "page": "bookmarks" }];

var NavItem = function (_React$PureComponent) {
    _inherits(NavItem, _React$PureComponent);

    function NavItem(props) {
        _classCallCheck(this, NavItem);

        var _this = _possibleConstructorReturn(this, (NavItem.__proto__ || Object.getPrototypeOf(NavItem)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(NavItem, [{
        key: "onClick",
        value: function onClick() {
            this.props.onClick(this.props.name, this.props.page);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "li",
                { className: "nav-item" + (this.props.active ? " active" : "") },
                _react2.default.createElement(
                    "a",
                    { onClick: this.onClick, href: "#", className: "nav-link" },
                    this.props.name
                )
            );
        }
    }]);

    return NavItem;
}(_react2.default.PureComponent);

var Navigation = function (_React$PureComponent2) {
    _inherits(Navigation, _React$PureComponent2);

    function Navigation(props) {
        _classCallCheck(this, Navigation);

        var _this2 = _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, props));

        _this2.state = {
            toggled: false
        };
        _this2.toggleNav = _this2.toggleNav.bind(_this2);
        _this2.navClick = _this2.navClick.bind(_this2);
        return _this2;
    }

    _createClass(Navigation, [{
        key: "toggleNav",
        value: function toggleNav() {
            this.setState({
                toggled: !this.state.toggled
            });
        }
    }, {
        key: "navClick",
        value: function navClick(name, page) {
            this.props.onNavClick(name, page);
            this.setState({
                toggled: false
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var navAreaClass = "collapse navbar-collapse" + (this.state.toggled ? " show" : "");

            return _react2.default.createElement(
                "nav",
                { className: "navbar navbar-expand-md navbar-light bg-light" },
                _react2.default.createElement(
                    "a",
                    { className: "navbar-brand", href: "#" },
                    "Spell DB"
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: this.toggleNav, className: "navbar-toggler", type: "button", "aria-label": "Toggle navigation" },
                    _react2.default.createElement("span", { className: "navbar-toggler-icon" })
                ),
                _react2.default.createElement(
                    "div",
                    { className: navAreaClass },
                    _react2.default.createElement(
                        "ul",
                        { className: "navbar-nav mr-auto" },
                        links.map(function (l) {
                            return _react2.default.createElement(NavItem, { key: l.name, name: l.name, page: l.page, active: l.page == _this3.props.activePage, onClick: _this3.navClick });
                        })
                    )
                )
            );
        }
    }]);

    return Navigation;
}(_react2.default.PureComponent);

exports.default = Navigation;