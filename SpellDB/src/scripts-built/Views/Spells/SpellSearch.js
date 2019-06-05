'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCheckboxGroup = require('react-checkbox-group');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpellSearch = function (_React$Component) {
    _inherits(SpellSearch, _React$Component);

    function SpellSearch(props) {
        _classCallCheck(this, SpellSearch);

        var _this = _possibleConstructorReturn(this, (SpellSearch.__proto__ || Object.getPrototypeOf(SpellSearch)).call(this, props));

        _this.handleCriteriaChange = _this.handleCriteriaChange.bind(_this);
        _this.handleLevelChange = _this.handleLevelChange.bind(_this);
        return _this;
    }

    _createClass(SpellSearch, [{
        key: 'handleLevelChange',
        value: function handleLevelChange(newLevels) {
            if (newLevels.indexOf('x') !== -1) this.props.onCriteriaReset();else this.props.onCriteriaChange('levels', newLevels);
        }
    }, {
        key: 'handleCriteriaChange',
        value: function handleCriteriaChange(event) {
            var target = event.target;
            var value = target.type === 'checkbox' ? target.checked : target.value;
            var name = target.name;

            this.props.onCriteriaChange(name, value);
        }
    }, {
        key: 'render',
        value: function render() {
            var powerOption = null;
            var showPowerOptions = this.props.powerType && this.props.powerOptions[this.props.powerType] && this.props.powerOptions[this.props.powerType].length > 1;

            var levelRows = [Array.from({ length: 4 }, function (v, i) {
                return i;
            }), Array.from({ length: 4 }, function (v, i) {
                return i + 4;
            }), Array.from({ length: 3 }, function (v, i) {
                return i + 8;
            }).concat('x')];

            return _react2.default.createElement(
                'form',
                { className: 'spell-search row' },
                _react2.default.createElement(
                    _reactCheckboxGroup.CheckboxGroup,
                    { className: 'col-md levels', name: 'levels', value: this.props.levels, onChange: this.handleLevelChange, checkboxDepth: 3 },
                    levelRows.map(function (lr) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'level-row', key: lr[0] },
                            lr.map(function (l) {
                                return _react2.default.createElement(
                                    'span',
                                    { key: l, className: 'level-col' },
                                    _react2.default.createElement(_reactCheckboxGroup.Checkbox, { id: "spell-level-" + l, value: l }),
                                    _react2.default.createElement(
                                        'label',
                                        { htmlFor: "spell-level-" + l, className: 'form-check-label' },
                                        String(l)
                                    )
                                );
                            })
                        );
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-md criteria' },
                    _react2.default.createElement(
                        'div',
                        { className: 'form-row' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'spellName', className: 'col-form-label form-label d-none d-sm-block' },
                            'Spell Name'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col' },
                            _react2.default.createElement('input', { className: 'form-control', id: 'spellName', name: 'spellName', type: 'text', value: this.props.spellName, onChange: this.handleCriteriaChange })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'form-row' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'powerType', className: 'col-form-label form-label d-none d-sm-block' },
                            'Spell Type'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col' },
                            _react2.default.createElement(
                                'select',
                                { className: 'form-control', id: 'powerType', name: 'powerType', value: this.props.powerType, onChange: this.handleCriteriaChange },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    'All'
                                ),
                                this.props.powerTypes.map(function (p) {
                                    return _react2.default.createElement(
                                        'option',
                                        { key: p, value: p },
                                        p
                                    );
                                })
                            )
                        )
                    ),
                    showPowerOptions ? _react2.default.createElement(
                        'div',
                        { className: 'form-row' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'powerOption', className: 'col-form-label form-label d-none d-sm-block' },
                            'Subtype'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col' },
                            _react2.default.createElement(
                                'select',
                                { className: 'form-control', id: 'powerOption', name: 'powerOption', value: this.props.powerOption, onChange: this.handleCriteriaChange },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    'All'
                                ),
                                this.props.powerOptions[this.props.powerType].map(function (p) {
                                    return _react2.default.createElement(
                                        'option',
                                        { key: p, value: p },
                                        p
                                    );
                                })
                            )
                        )
                    ) : null
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-md sort' },
                    _react2.default.createElement(
                        'div',
                        { className: 'form-row' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'sortBy', className: 'col-form-label form-label d-none d-sm-block' },
                            'Sort By'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col' },
                            _react2.default.createElement(
                                'select',
                                { className: 'form-control', id: 'sortBy', name: 'sortBy', value: this.props.sortBy, onChange: this.handleCriteriaChange },
                                this.props.sortOptions.map(function (p) {
                                    return _react2.default.createElement(
                                        'option',
                                        { key: p, value: p },
                                        p
                                    );
                                })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'form-row' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'displayMode', className: 'col-form-label form-label d-none d-sm-block' },
                            'Display As'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col' },
                            _react2.default.createElement(
                                'select',
                                { className: 'form-control', id: 'displayMode', name: 'displayMode', value: this.props.displayMode, onChange: this.handleCriteriaChange },
                                this.props.displayModes.map(function (p) {
                                    return _react2.default.createElement(
                                        'option',
                                        { key: p, value: p },
                                        p
                                    );
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SpellSearch;
}(_react2.default.Component);

exports.default = SpellSearch;
;