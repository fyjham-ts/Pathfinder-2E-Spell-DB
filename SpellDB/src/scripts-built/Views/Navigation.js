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

var links = [{ "name": "Spells", "page": "spells" }, { "name": "Bookmark Manager", "page": "bookmarks" }, { "name": "Quick References", "page": "quickref" }, { "name": "Dark Mode", "navType": "DarkMode" }, { "name": "About", "page": "about" }];

var DarkModeItem = function (_React$PureComponent) {
    _inherits(DarkModeItem, _React$PureComponent);

    function DarkModeItem(props) {
        _classCallCheck(this, DarkModeItem);

        var _this = _possibleConstructorReturn(this, (DarkModeItem.__proto__ || Object.getPrototypeOf(DarkModeItem)).call(this, props));

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(DarkModeItem, [{
        key: "onChange",
        value: function onChange(e) {
            this.props.onChange(e.target.checked);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "li",
                { className: "nav-item" },
                _react2.default.createElement(
                    "label",
                    { className: "nav-link" },
                    _react2.default.createElement(
                        "span",
                        { className: "switch" },
                        _react2.default.createElement("input", { type: "checkbox", onChange: this.onChange, defaultChecked: this.props.darkMode }),
                        _react2.default.createElement("span", { className: "slider" })
                    ),
                    this.props.name
                )
            );
        }
    }]);

    return DarkModeItem;
}(_react2.default.PureComponent);

var NavItem = function (_React$PureComponent2) {
    _inherits(NavItem, _React$PureComponent2);

    function NavItem(props) {
        _classCallCheck(this, NavItem);

        var _this2 = _possibleConstructorReturn(this, (NavItem.__proto__ || Object.getPrototypeOf(NavItem)).call(this, props));

        _this2.onClick = _this2.onClick.bind(_this2);
        return _this2;
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

var Navigation = function (_React$PureComponent3) {
    _inherits(Navigation, _React$PureComponent3);

    function Navigation(props) {
        _classCallCheck(this, Navigation);

        var _this3 = _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, props));

        _this3.state = {
            toggled: false
        };
        _this3.toggleNav = _this3.toggleNav.bind(_this3);
        _this3.navClick = _this3.navClick.bind(_this3);
        _this3.darkModeToggle = _this3.darkModeToggle.bind(_this3);
        return _this3;
    }

    _createClass(Navigation, [{
        key: "toggleNav",
        value: function toggleNav() {
            this.setState({
                toggled: !this.state.toggled
            });
        }
    }, {
        key: "darkModeToggle",
        value: function darkModeToggle(dark) {
            this.props.onDarkToggle(dark);
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
            var _this4 = this;

            var navAreaClass = "collapse navbar-collapse" + (this.state.toggled ? " show" : "");

            return _react2.default.createElement(
                "nav",
                { className: "navbar navbar-expand-md " + (this.props.darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light") },
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
                            switch (l.navType) {
                                case "DarkMode":
                                    return _react2.default.createElement(DarkModeItem, { key: l.name, name: l.name, darkMode: _this4.props.darkMode, onChange: _this4.darkModeToggle });break;
                                default:
                                    return _react2.default.createElement(NavItem, { key: l.name, name: l.name, page: l.page, active: l.page == _this4.props.activePage, onClick: _this4.navClick });break;
                            }
                        })
                    )
                )
            );
        }
    }]);

    return Navigation;
}(_react2.default.PureComponent);

exports.default = Navigation;