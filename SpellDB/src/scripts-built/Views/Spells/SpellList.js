'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SpellSearch = require('./SpellSearch.js');

var _SpellSearch2 = _interopRequireDefault(_SpellSearch);

var _SpellListItem = require('./SpellListItem.js');

var _SpellListItem2 = _interopRequireDefault(_SpellListItem);

var _SpellDetail = require('./SpellDetail.js');

var _SpellDetail2 = _interopRequireDefault(_SpellDetail);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _SpellLoader = require('../../SpellLoader.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import { ipcRenderer } from 'electron';


var _loadSpellData = (0, _SpellLoader.loadSpellData)(),
    spells = _loadSpellData.spells,
    spellTypes = _loadSpellData.spellTypes;

spellTypes.sort(function (lhs, rhs) {
    return lhs.name < rhs.name ? -1 : lhs.name > rhs.name ? 1 : 0;
});

var defaultMaxRows = 50;
var getDefaultCriteria = function getDefaultCriteria() {
    return {
        'spellName': '',
        'spellType': '',
        'spellOption': '',
        'sortBy': 'Level',
        'displayMode': 'Details',
        'levels': []
    };
};

var SpellList = function (_React$Component) {
    _inherits(SpellList, _React$Component);

    function SpellList(props) {
        _classCallCheck(this, SpellList);

        var _this = _possibleConstructorReturn(this, (SpellList.__proto__ || Object.getPrototypeOf(SpellList)).call(this, props));

        _this.state = {
            spellTypes: spellTypes,
            spells: spells,
            maxRows: defaultMaxRows,
            criteria: getDefaultCriteria(),
            selectedSpell: null,
            bookmarkLists: _this.props.bookmarkManager.getBookmarkLists(),
            activeBookmarkList: _this.props.bookmarkManager.getActiveBookmarkList()
        };
        _this.state.spellTypes.forEach(function (st) {
            if (st.matchBy == "bookmark") st.options = _this.state.bookmarkLists.map(function (l) {
                return { "name": l.name, "value": l.id };
            });

            if ((st.matchBy == "array" || st.matchBy == 'value') && st.options == null) {
                // Doing this every load may be too slow with all the spells. If it is, move this to a preprocessor build script for spell types.
                st.options = [];
                var added = {};
                _this.state.spells.forEach(function (s) {
                    var opts = s[st.match];
                    if (st.matchBy == "array" && opts && Array.isArray(opts)) {
                        opts.forEach(function (o) {
                            if (o.length > 0 && !added[o]) {
                                added[o] = true;
                                st.options.push({ "name": o.charAt(0).toUpperCase() + o.slice(1), "value": o });
                            }
                        });
                    } else if (st.matchBy == 'value' && opts) {
                        if (!added[opts]) {
                            added[opts] = true;
                            st.options.push({ "name": opts.charAt(0).toUpperCase() + opts.slice(1), "value": opts });
                        }
                    }
                    switch (st.sort) {
                        case "duration":
                            var durations = ['round', 'minute', 'hour', 'day', 'month', 'year'];
                            var splitExp = new RegExp("(\\d+) ((?:" + durations.join(")|(?:") + "))s?", "i");
                            st.options.sort(function (lhs, rhs) {
                                var lhsMatch = lhs.name.match(splitExp);
                                var rhsMatch = rhs.name.match(splitExp);
                                if (lhsMatch && !rhsMatch) return -1;else if (!lhsMatch && rhsMatch) return 1;else if (!lhsMatch && !rhsMatch) return lhs.name < rhs.name ? -1 : lhs.name == rhs.name ? 0 : 1;else {
                                    if (lhsMatch[2] != rhsMatch[2]) return durations.indexOf(lhsMatch[2].toLowerCase()) - durations.indexOf(rhsMatch[2].toLowerCase());else if (lhsMatch[1] != rhsMatch[1]) return parseInt(lhsMatch[1]) - parseInt(rhsMatch[1]);else return lhs.name < rhs.name ? -1 : lhs.name == rhs.name ? 0 : 1;
                                }
                            });
                            break;
                        default:
                            st.options.sort(function (lhs, rhs) {
                                return lhs.name < rhs.name ? -1 : lhs.name == rhs.name ? 0 : 1;
                            });
                    }
                });
            }
        });
        _this.criteriaReset = _this.criteriaReset.bind(_this);
        _this.criteriaChange = _this.criteriaChange.bind(_this);
        _this.criteriaSort = _this.criteriaSort.bind(_this);
        _this.meetsCriteria = _this.meetsCriteria.bind(_this);
        _this.selectSpell = _this.selectSpell.bind(_this);
        _this.showMore = _this.showMore.bind(_this);
        _this.isBookmarked = _this.isBookmarked.bind(_this);
        _this.bookmarkSpell = _this.bookmarkSpell.bind(_this);

        _this.bookmarkListUpdate = _this.bookmarkListUpdate.bind(_this);
        _this.activeBookmarkListUpdate = _this.activeBookmarkListUpdate.bind(_this);

        _this.props.bookmarkManager.on(_this.props.bookmarkManager.events.dataUpdate, _this.bookmarkListUpdate);
        _this.props.bookmarkManager.on(_this.props.bookmarkManager.events.activeListUpdate, _this.activeBookmarkListUpdate);
        _this.componentWillUnmount = function () {
            this.props.bookmarkManager.off(this.props.bookmarkManager.events.dataUpdate, this.bookmarkListUpdate);
            this.props.bookmarkManager.off(this.props.bookmarkManager.events.activeListUpdate, this.activeBookmarkListUpdate);
        }.bind(_this);
        return _this;
    }

    _createClass(SpellList, [{
        key: 'bookmarkListUpdate',
        value: function bookmarkListUpdate(ev, args) {
            var _this2 = this;

            var types = JSON.parse(JSON.stringify(this.state.spellTypes));
            types.forEach(function (st) {
                if (st.matchBy == "bookmark") st.options = _this2.state.bookmarkLists.map(function (l) {
                    return { "name": l.name, "value": l.id };
                });
            });
            this.setState({
                "bookmarkLists": args,
                "spellTypes": types
            });
        }
    }, {
        key: 'activeBookmarkListUpdate',
        value: function activeBookmarkListUpdate(ev, args) {
            this.setState({
                "activeBookmarkList": args
            });
        }
    }, {
        key: 'isBookmarked',
        value: function isBookmarked(spell) {
            return !!(this.state.activeBookmarkList && this.state.activeBookmarkList.spells[spell.name]);
        }
    }, {
        key: 'bookmarkSpell',
        value: function bookmarkSpell(spell) {
            this.props.bookmarkManager.toggleSpell(spell.name);
        }
    }, {
        key: 'showMore',
        value: function showMore() {
            this.setState(function (s) {
                return { 'maxRows': s.maxRows + defaultMaxRows };
            });
        }
    }, {
        key: 'meetsCriteria',
        value: function meetsCriteria(spell) {
            var _this3 = this;

            if (this.state.criteria.spellName) {
                if (spell.name.toLowerCase().indexOf(this.state.criteria.spellName.toLowerCase()) === -1) return false;
            }
            if (this.state.criteria.spellType) {
                var spellType = this.state.spellTypes.find(function (t) {
                    return t.name == _this3.state.criteria.spellType;
                });
                switch (spellType.matchBy) {
                    case "bookmark":
                        if (this.state.criteria.spellOption) {
                            var list = this.state.bookmarkLists.find(function (l) {
                                return l.id === _this3.state.criteria.spellOption;
                            });
                            if (list && !list.spells[spell.name]) return false;
                        }
                        break;
                    case "lookup":
                        if (this.state.criteria.spellOption) {
                            if (!spellType.lookup[this.state.criteria.spellOption]) return false;
                            if (spellType.lookup[this.state.criteria.spellOption].indexOf(spell.name) === -1) return false;
                        } else {
                            // For lookups, filter that it must be in one of the lists
                            var found = false;
                            for (var option in spellType.lookup) {
                                found = found || spellType.lookup[option].indexOf(spell.name) !== -1;
                            }
                            if (!found) return false;
                        }
                        break;
                    case "list":
                        if (spellType.lookup.indexOf(spell.name) === -1) return false;
                        break;
                    case "array":
                        if (this.state.criteria.spellOption) {
                            if (!spell[spellType.match] || spell[spellType.match].indexOf(this.state.criteria.spellOption) == -1) return false;
                        }
                        break;
                    case "value":
                        if (this.state.criteria.spellOption) {
                            if (!spell[spellType.match] || spell[spellType.match] != this.state.criteria.spellOption) return false;
                        }
                        break;
                }
            }
            if (this.state.criteria.levels.length > 0) {
                if (spell.type == 'Cantrip') {
                    if (this.state.criteria.levels.indexOf('C') === -1) return false;
                } else if (this.state.criteria.levels.indexOf(spell.level) === -1) return false;
            }
            return true;
        }
    }, {
        key: 'selectSpell',
        value: function selectSpell(spell) {
            this.setState({
                selectedSpell: spell
            });
        }
    }, {
        key: 'criteriaReset',
        value: function criteriaReset() {
            var newCriteria = getDefaultCriteria();
            newCriteria.displayMode = this.state.criteria.displayMode;
            this.setState({
                criteria: newCriteria
            });
        }
    }, {
        key: 'criteriaChange',
        value: function criteriaChange(name, value) {
            if (name === "spellType") {
                var _update;

                var spellOption = "";
                var spellType = this.state.spellTypes.find(function (t) {
                    return t.name == value;
                });
                if (spellType && spellType.matchBy == "bookmark") spellOption = this.state.activeBookmarkList.id;
                this.setState({
                    criteria: (0, _immutabilityHelper2.default)(this.state.criteria, (_update = {}, _defineProperty(_update, name, { $set: value }), _defineProperty(_update, 'spellOption', { $set: spellOption }), _update)),
                    maxRows: defaultMaxRows
                });
            } else {
                this.setState({
                    criteria: (0, _immutabilityHelper2.default)(this.state.criteria, _defineProperty({}, name, { $set: value })),
                    maxRows: defaultMaxRows
                });
            }
        }
    }, {
        key: 'criteriaSort',
        value: function criteriaSort(lhs, rhs) {
            switch (this.state.criteria.sortBy) {
                case "Name":
                    if (lhs.name.toLowerCase() < rhs.name.toLowerCase()) return -1;
                    if (lhs.name.toLowerCase() > rhs.name.toLowerCase()) return 1;
                    return 0;
                case "Level":
                    if (lhs.level - rhs.level != 0) return lhs.level - rhs.level;
                    if (lhs.type == "Cantrip" && rhs.type != "Cantrip") return -1;
                    if (lhs.type != "Cantrip" && rhs.type == "Cantrip") return 1;
                    if (lhs.name.toLowerCase() < rhs.name.toLowerCase()) return -1;
                    if (lhs.name.toLowerCase() > rhs.name.toLowerCase()) return 1;
                    return 0;
                case "Actions":
                    var seq = ["free", "reaction", "1", "2", "3"];
                    var lhsA = seq.indexOf(Array.isArray(lhs.action) ? lhs.action[0] : lhs.action);
                    var rhsA = seq.indexOf(Array.isArray(rhs.action) ? rhs.action[0] : rhs.action);
                    if (lhsA != -1 && rhsA == -1) return -1; // Assume if it's not in the list it's longer
                    if (lhsA == -1 && rhsA != -1) return 1;
                    if (lhsA < rhsA) return -1;
                    if (lhsA > rhsA) return 1;
                    // Fallback to alpha
                    if (lhs.name.toLowerCase() < rhs.name.toLowerCase()) return -1;
                    if (lhs.name.toLowerCase() > rhs.name.toLowerCase()) return 1;
                    return 0;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var visibleSpells = this.state.spells.filter(this.meetsCriteria).sort(this.criteriaSort);
            var truncated = false;
            if (visibleSpells.length > this.state.maxRows) {
                visibleSpells = visibleSpells.slice(0, this.state.maxRows);
                truncated = true;
            }

            var selectedSpell = this.state.selectedSpell;
            if ((!selectedSpell || !this.meetsCriteria(selectedSpell)) && visibleSpells.length > 0) selectedSpell = visibleSpells[0];

            var detail = null;
            if (selectedSpell && this.state.criteria.displayMode == 'List') detail = _react2.default.createElement(
                'div',
                { className: 'col-sm selectedSpell' },
                _react2.default.createElement(_SpellDetail2.default, { spell: selectedSpell,
                    bookmarked: this.isBookmarked(selectedSpell),
                    onBookmark: this.bookmarkSpell
                })
            );
            return _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-sm' },
                        _react2.default.createElement(_SpellSearch2.default, {
                            spellTypes: this.state.spellTypes,
                            sortOptions: ["Name", "Level", "Actions"],
                            displayModes: ["List", "Details"],
                            spellType: this.state.criteria.spellType,
                            spellOption: this.state.criteria.spellOption,
                            spellName: this.state.criteria.spellName,
                            sortBy: this.state.criteria.sortBy,
                            levels: this.state.criteria.levels,
                            displayMode: this.state.criteria.displayMode,
                            showDetails: this.state.criteria.showDetails,
                            onCriteriaChange: this.criteriaChange,
                            onCriteriaReset: this.criteriaReset
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: "col-sm spellList" + this.state.criteria.displayMode },
                        _react2.default.createElement(
                            'ul',
                            { className: 'list-group' },
                            visibleSpells.map(function (s) {
                                if (_this4.state.criteria.displayMode == "Details") return _react2.default.createElement(_SpellDetail2.default, {
                                    key: s.name,
                                    spell: s,
                                    bookmarked: _this4.isBookmarked(s),
                                    onBookmark: _this4.bookmarkSpell
                                });else return _react2.default.createElement(_SpellListItem2.default, {
                                    key: s.name,
                                    spell: s,
                                    selected: s == selectedSpell,
                                    onSelect: _this4.selectSpell
                                });
                            }),
                            truncated ? _react2.default.createElement(
                                'li',
                                { className: 'list-group-item list-group-item-info', onClick: this.showMore },
                                'Show More...'
                            ) : null
                        )
                    ),
                    detail
                )
            );
        }
    }]);

    return SpellList;
}(_react2.default.Component);

exports.default = SpellList;
;