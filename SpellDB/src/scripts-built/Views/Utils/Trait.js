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

// Turns out Paizo says no to using their icons. Sadness.
// If they ever become community use, flip this.
var canUseIcons = false;

var Trait = function (_React$PureComponent) {
    _inherits(Trait, _React$PureComponent);

    function Trait() {
        _classCallCheck(this, Trait);

        return _possibleConstructorReturn(this, (Trait.__proto__ || Object.getPrototypeOf(Trait)).apply(this, arguments));
    }

    _createClass(Trait, [{
        key: "determineClass",
        value: function determineClass(trait) {
            switch (trait) {
                case "uncommon":
                case "rare":
                case "unique":
                    return trait;
                //                return "alignment";
                case "evil":
                case "good":
                case "chaotic":
                case "lawful":
                default:
                    return "";
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "li",
                { className: this.determineClass(this.props.trait) },
                this.props.trait
            );
        }
    }]);

    return Trait;
}(_react2.default.PureComponent);

exports.default = Trait;