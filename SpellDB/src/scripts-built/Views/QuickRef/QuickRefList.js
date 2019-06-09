'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMarkdown = require('react-markdown');

var _reactMarkdown2 = _interopRequireDefault(_reactMarkdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuickRefList = function (_React$PureComponent) {
    _inherits(QuickRefList, _React$PureComponent);

    function QuickRefList(props) {
        _classCallCheck(this, QuickRefList);

        var _this = _possibleConstructorReturn(this, (QuickRefList.__proto__ || Object.getPrototypeOf(QuickRefList)).call(this, props));

        _this.state = {
            expanded: {}
        };
        _this.toggleExpand = _this.toggleExpand.bind(_this);
        return _this;
    }

    _createClass(QuickRefList, [{
        key: 'toggleExpand',
        value: function toggleExpand(name) {
            var expanded = Object.assign({}, this.state.expanded);
            expanded[name] = !expanded[name];
            this.setState({ expanded: expanded });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'quickRefList accordion' },
                this.props.list.map(function (c) {
                    return _react2.default.createElement(
                        'div',
                        { key: c.name, className: 'card' },
                        _react2.default.createElement(
                            'div',
                            { className: 'card-header', onClick: function onClick() {
                                    return _this2.toggleExpand(c.name);
                                } },
                            c.icon && _react2.default.createElement(
                                'span',
                                { className: c.icon },
                                c.iconText
                            ),
                            c.name
                        ),
                        _this2.state.expanded[c.name] && _react2.default.createElement(
                            'div',
                            { className: 'card-body' },
                            _react2.default.createElement(_reactMarkdown2.default, { source: c.description })
                        )
                    );
                })
            );
        }
    }]);

    return QuickRefList;
}(_react2.default.PureComponent);

exports.default = QuickRefList;