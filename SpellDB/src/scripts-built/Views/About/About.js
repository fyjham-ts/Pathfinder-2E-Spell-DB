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

var About = function (_React$Component) {
    _inherits(About, _React$Component);

    function About(props) {
        _classCallCheck(this, About);

        var _this = _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).call(this, props));

        _this.state = {
            "oglExpanded": false
        };
        return _this;
    }

    _createClass(About, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "about" },
                _react2.default.createElement(
                    "h2",
                    null,
                    "About"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "This was created to help people quickly look up info for their 2E games - if you have some fun with it that's great! I wrote a similar one for playtest, this time I ported to mobile."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "The full code is available on GitHub - ",
                    _react2.default.createElement(
                        "a",
                        { target: "_blank", href: "https://github.com/fyjham-ts/Pathfinder-2E-Spell-DB" },
                        "https://github.com/fyjham-ts/Pathfinder-2E-Spell-DB"
                    ),
                    " - I'd love to hear your input. If you hit any bugs or want to request a feature, raise a GitHub issue!"
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "Credits"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "Written by Tim Schneider."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "OGL & Community Use content from Paizo HEAVILY used. No claim being made here."
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "License Stuff"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "I'm a programmer not a lawyer, below comes the things I think I have to say to keep the legal people happy. Content from Paizo is licensed under OGL or Community Use as appropriate. My code is all available under MIT license."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "If anyone at paizo believes I've messed up let me know. I've done this all in good faith, and will take down at a simple request (Whether I've breached any license or not - I'm happy to honour any request from Paizo for how to use their content)."
                ),
                _react2.default.createElement(
                    "h3",
                    null,
                    "OGL"
                ),
                _react2.default.createElement(
                    "pre",
                    null,
                    "There'll totally be an OGL here once I have the playtest book in PDF form for copy-pasta."
                ),
                _react2.default.createElement(
                    "h3",
                    null,
                    "MIT License"
                ),
                _react2.default.createElement(
                    "pre",
                    null,
                    "Copyright (c) 2019 Tim Schneider Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE."
                ),
                _react2.default.createElement(
                    "h3",
                    null,
                    "Community Use"
                ),
                _react2.default.createElement(
                    "i",
                    null,
                    "This application uses trademarks and/or copyrights owned by Paizo Inc., which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This application is not published, endorsed, or specifically approved by Paizo Inc. For more information about Paizo's Community Use Policy, please visit paizo.com/communityuse. For more information about Paizo Inc. and Paizo products, please visit paizo.com"
                )
            );
        }
    }]);

    return About;
}(_react2.default.Component);

exports.default = About;