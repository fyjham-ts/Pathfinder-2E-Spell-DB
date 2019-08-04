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

var ActionIcons = function (_React$PureComponent) {
    _inherits(ActionIcons, _React$PureComponent);

    function ActionIcons() {
        _classCallCheck(this, ActionIcons);

        return _possibleConstructorReturn(this, (ActionIcons.__proto__ || Object.getPrototypeOf(ActionIcons)).apply(this, arguments));
    }

    _createClass(ActionIcons, [{
        key: "renderIcon",
        value: function renderIcon(action) {
            if (canUseIcons) return _react2.default.createElement("img", { className: "actions", src: "images/action-" + this.props.action + ".png", alt: action });else {
                return _react2.default.createElement(
                    "span",
                    { className: "actions actions-" + action },
                    function () {
                        switch (action) {
                            case "1":
                                return "◈";
                            case "2":
                                return "◈◈";
                            case "3":
                                return "◈◈◈";
                            case "free":
                                return "◇"; // "⟐";
                            case "reaction":
                                return "⤾";
                            default:
                                return action;
                        }
                    }()
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            if (Array.isArray(this.props.action)) {
                var output = this.props.action.map(function (a) {
                    return _this2.renderIcon(a);
                });
                // If we have 2 icons put " to " between
                if (output.length == 2) output.splice(1, 0, ' to ');
                return _react2.default.createElement(
                    "span",
                    null,
                    output
                );
            } else return this.renderIcon(this.props.action);
        }
    }]);

    return ActionIcons;
}(_react2.default.PureComponent);

exports.default = ActionIcons;