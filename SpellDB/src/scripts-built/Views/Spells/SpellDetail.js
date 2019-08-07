'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMarkdown = require('react-markdown');

var _reactMarkdown2 = _interopRequireDefault(_reactMarkdown);

var _ActionIcons = require('../Utils/ActionIcons.js');

var _ActionIcons2 = _interopRequireDefault(_ActionIcons);

var _Trait = require('../Utils/Trait.js');

var _Trait2 = _interopRequireDefault(_Trait);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpellDetail = function (_React$PureComponent) {
    _inherits(SpellDetail, _React$PureComponent);

    function SpellDetail(props) {
        _classCallCheck(this, SpellDetail);

        var _this = _possibleConstructorReturn(this, (SpellDetail.__proto__ || Object.getPrototypeOf(SpellDetail)).call(this, props));

        _this.toggleBookmark = _this.toggleBookmark.bind(_this);
        return _this;
    }

    _createClass(SpellDetail, [{
        key: 'toggleBookmark',
        value: function toggleBookmark() {
            this.props.onBookmark(this.props.spell);
        }
    }, {
        key: 'render',
        value: function render() {
            var spell = this.props.spell;

            var headerTokens = [];
            if (spell['casting-time']) headerTokens.push({ 'title': 'Casting Time', 'value': spell['casting-time'] });
            if (spell.trigger) headerTokens.push({ 'title': 'Trigger', 'value': spell.trigger });
            if (spell.range) headerTokens.push({ 'title': 'Range', 'value': spell.range });
            if (spell.area) headerTokens.push({ 'title': 'Area', 'value': spell.area });
            if (spell.targets) headerTokens.push({ 'title': 'Targets', 'value': spell.targets });
            if (spell.duration) headerTokens.push({ 'title': 'Duration', 'value': spell.duration });
            if (spell.cost) headerTokens.push({ 'title': 'Cost', 'value': spell.cost });
            if (spell.requirements) headerTokens.push({ 'title': "Requirements", 'value': spell.requirements });

            var bodySections = [];
            bodySections.push({ 'title': null, className: 'mainText', 'text': spell.description });

            for (var level in spell.heightened) {
                bodySections.push({ 'title': _react2.default.createElement(
                        'strong',
                        null,
                        'Heightened(',
                        level,
                        ')'
                    ), 'className': 'heighten', 'text': spell.heightened[level] });
            }

            return _react2.default.createElement(
                'div',
                { className: 'spellDetail clearfix' },
                _react2.default.createElement(
                    'div',
                    { className: 'title' },
                    _react2.default.createElement(
                        'span',
                        { className: 'spellClass' },
                        _react2.default.createElement(
                            'span',
                            { className: this.props.bookmarked ? "bookmark active" : "bookmark inactive", onClick: this.toggleBookmark },
                            _react2.default.createElement('i', { className: this.props.bookmarked ? "fas fa-bookmark" : "far fa-bookmark" })
                        ),
                        spell.type,
                        ' ',
                        spell.level
                    ),
                    spell.name
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'traits' },
                    spell.traits.map(function (t, index) {
                        return _react2.default.createElement(_Trait2.default, { key: index, trait: t });
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'header' },
                    spell.traditions && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'strong',
                            null,
                            'Traditions'
                        ),
                        ' ',
                        spell.traditions.join(", ")
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'strong',
                            null,
                            'Cast'
                        ),
                        ' ',
                        _react2.default.createElement(_ActionIcons2.default, { action: spell.action }),
                        ' ',
                        spell.components && spell.components.join(spell.componentsSeparator || ", ")
                    ),
                    headerTokens.map(function (t) {
                        return _react2.default.createElement(
                            'span',
                            { key: t.title, className: 'headerElement' },
                            _react2.default.createElement(
                                'strong',
                                null,
                                t.title
                            ),
                            ' ',
                            t.value
                        );
                    }),
                    spell['saving throw'] && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'span',
                            { className: 'headerElement' },
                            _react2.default.createElement(
                                'strong',
                                null,
                                'Saving Throw'
                            ),
                            ' ',
                            spell['saving throw']
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'body' },
                    bodySections.map(function (s, index) {
                        return _react2.default.createElement(
                            'div',
                            { key: index, className: s.className },
                            s.title,
                            _react2.default.createElement(_reactMarkdown2.default, { source: s.text })
                        );
                    })
                )
            );
        }
    }]);

    return SpellDetail;
}(_react2.default.PureComponent);

exports.default = SpellDetail;
;