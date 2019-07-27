'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _QuickRefList = require('./QuickRefList.js');

var _QuickRefList2 = _interopRequireDefault(_QuickRefList);

var _QuickRefTile = require('./QuickRefTile.js');

var _QuickRefTile2 = _interopRequireDefault(_QuickRefTile);

var _RefLoader = require('../../RefLoader.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var references = (0, _RefLoader.loadRefData)();

var QuickRefIndex = function (_React$PureComponent) {
    _inherits(QuickRefIndex, _React$PureComponent);

    function QuickRefIndex(props) {
        _classCallCheck(this, QuickRefIndex);

        var _this = _possibleConstructorReturn(this, (QuickRefIndex.__proto__ || Object.getPrototypeOf(QuickRefIndex)).call(this, props));

        _this.state = {
            "activeRef": null
        };
        _this.backToListing = _this.backToListing.bind(_this);
        _this.setActiveRef = _this.setActiveRef.bind(_this);
        return _this;
    }

    _createClass(QuickRefIndex, [{
        key: 'backToListing',
        value: function backToListing() {
            this.setActiveRef(null);
        }
    }, {
        key: 'setActiveRef',
        value: function setActiveRef(ref) {
            this.setState({ "activeRef": ref });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.state.activeRef == null) {
                return _react2.default.createElement(
                    'div',
                    { className: 'quickRefGrid' },
                    references.map(function (r) {
                        return _react2.default.createElement(_QuickRefTile2.default, { key: r.name, QuickReference: r, onSelect: _this2.setActiveRef });
                    })
                );
            } else {
                var listContent = null;
                switch (this.state.activeRef.render) {
                    case "list":
                    default:
                        listContent = _react2.default.createElement(_QuickRefList2.default, { list: this.state.activeRef.list });
                        break;
                }
                return _react2.default.createElement(
                    'div',
                    { className: 'quickRefContent' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        _react2.default.createElement('i', { className: this.state.activeRef.icon }),
                        ' ',
                        this.state.activeRef.name
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'back', onClick: this.backToListing },
                        _react2.default.createElement('i', { className: 'fa fa-chevron-left' }),
                        ' Back to listing'
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        this.state.activeRef.description && _react2.default.createElement(
                            'p',
                            { 'class': 'quickRefDescription' },
                            this.state.activeRef.description
                        ),
                        listContent
                    )
                );
            }
        }
    }]);

    return QuickRefIndex;
}(_react2.default.PureComponent);

exports.default = QuickRefIndex;