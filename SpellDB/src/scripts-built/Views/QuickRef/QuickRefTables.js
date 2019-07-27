'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _QuickRefTable = require('./QuickRefTable.js');

var _QuickRefTable2 = _interopRequireDefault(_QuickRefTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuickRefTables = function (_React$PureComponent) {
    _inherits(QuickRefTables, _React$PureComponent);

    function QuickRefTables(props) {
        _classCallCheck(this, QuickRefTables);

        var _this = _possibleConstructorReturn(this, (QuickRefTables.__proto__ || Object.getPrototypeOf(QuickRefTables)).call(this, props));

        _this.state = {
            expanded: {}
        };
        return _this;
    }

    _createClass(QuickRefTables, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'quickRefTables container' },
                _react2.default.createElement(
                    'div',
                    { className: 'row justify-content-md-center' },
                    this.props.tables.map(function (t, idx) {
                        return _react2.default.createElement(
                            'div',
                            { key: idx, className: 'col-md' },
                            _react2.default.createElement(_QuickRefTable2.default, { table: t })
                        );
                    })
                )
            );
        }
    }]);

    return QuickRefTables;
}(_react2.default.PureComponent);

exports.default = QuickRefTables;