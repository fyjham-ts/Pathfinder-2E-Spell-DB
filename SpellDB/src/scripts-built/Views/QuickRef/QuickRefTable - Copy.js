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

var QuickRefTable = function (_React$PureComponent) {
    _inherits(QuickRefTable, _React$PureComponent);

    function QuickRefTable(props) {
        _classCallCheck(this, QuickRefTable);

        var _this = _possibleConstructorReturn(this, (QuickRefTable.__proto__ || Object.getPrototypeOf(QuickRefTable)).call(this, props));

        _this.state = {
            expanded: {}
        };
        return _this;
    }

    _createClass(QuickRefTable, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'quickRefTable' },
                _react2.default.createElement(
                    'table',
                    { className: 'table' },
                    _react2.default.createElement(
                        'thead',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            this.props.table.columns.map(function (c, ci) {
                                return _react2.default.createElement(
                                    'th',
                                    { key: ci, className: c.colType },
                                    c.title
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        this.props.table.rows.map(function (r, ri) {
                            return _react2.default.createElement(
                                'tr',
                                { key: ri },
                                _this2.props.table.columns.map(function (c, ci) {
                                    return _react2.default.createElement(
                                        'td',
                                        { key: ci, className: c.colType },
                                        r.length > ci && r[ci]
                                    );
                                })
                            );
                        })
                    )
                )
            );
        }
    }]);

    return QuickRefTable;
}(_react2.default.PureComponent);

exports.default = QuickRefTable;