import React from 'react';
//import { ipcRenderer } from 'electron';
import SpellSearch from './SpellSearch.jsx';
import SpellListItem from './SpellListItem.jsx';
import SpellDetail from './SpellDetail.jsx';
import update from 'immutability-helper';
import { loadSpellData } from '../../SpellLoader.jsx';
import { throttle, debounce } from 'throttle-debounce';
import BookmarkListSummary from '../Bookmarks/BookmarkListSummary.jsx';

let { spells, spellTypes } = loadSpellData();

spellTypes.sort((lhs, rhs) => lhs.name < rhs.name ? -1 : (lhs.name > rhs.name ? 1 : 0));

const throttleMs = 1000;
const debounceMs = 1000;
const throttleMaxChars = 10;

var defaultMaxRows = 20;
var getDefaultCriteria = () => {
    return {
        'spellName': '',
        'spellType': '',
        'spellOption': '',
        'sortBy': 'Level',
        'displayMode': 'Details',
        'levels': []
    };
};

export default class SpellList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spellTypes: spellTypes,
            spells: spells,
            maxRows: defaultMaxRows,
            criteria: getDefaultCriteria(),
            selectedSpell: null,
            bookmarkLists: this.props.bookmarkManager.getBookmarkLists(),
            activeBookmarkList: this.props.bookmarkManager.getActiveBookmarkList(),
            visibleSpells: [],
            vancianMode: 'prep' // Values: prep, cast, off
        };
        this.state.spellTypes.forEach(st => {
            if (st.matchBy == "bookmark") st.options = this.state.bookmarkLists.map(l => ({ "name": l.name, "value": l.id }));

            if ((st.matchBy == "array" || st.matchBy == 'value') && st.options == null) {
                // Doing this every load may be too slow with all the spells. If it is, move this to a preprocessor build script for spell types.
                st.options = [];
                var added = {};
                this.state.spells.forEach(s => {
                    var opts = s[st.match];
                    if (st.matchBy == "array" && opts && Array.isArray(opts)) {
                        opts.forEach(o => {
                            if (o.length > 0 && !added[o]) {
                                added[o] = true;
                                st.options.push({ "name": o.charAt(0).toUpperCase() + o.slice(1), "value": o });
                            }
                        });
                    }
                    else if (st.matchBy == 'value' && opts) {
                        if (!added[opts]) {
                            added[opts] = true;
                            st.options.push({ "name": opts.charAt(0).toUpperCase() + opts.slice(1), "value": opts });
                        }
                    }
                    switch (st.sort) {
                        case "duration":
                            var durations = ['round', 'minute', 'hour', 'day', 'month', 'year'];
                            var splitExp = new RegExp("(\\d+) ((?:" + durations.join(")|(?:") + "))s?", "i");
                            st.options.sort((lhs, rhs) => {
                                var lhsMatch = lhs.name.match(splitExp);
                                var rhsMatch = rhs.name.match(splitExp);
                                if (lhsMatch && !rhsMatch) return -1;
                                else if (!lhsMatch && rhsMatch) return 1;
                                else if (!lhsMatch && !rhsMatch) return lhs.name < rhs.name ? -1 : (lhs.name == rhs.name ? 0 : 1);
                                else {
                                    if (lhsMatch[2] != rhsMatch[2]) return durations.indexOf(lhsMatch[2].toLowerCase()) - durations.indexOf(rhsMatch[2].toLowerCase());
                                    else if (lhsMatch[1] != rhsMatch[1]) return parseInt(lhsMatch[1]) - parseInt(rhsMatch[1]);
                                    else return lhs.name < rhs.name ? -1 : (lhs.name == rhs.name ? 0 : 1);
                                }
                            });
                            break;
                        case "range":
                            var rangeSteps = ["touch", "feet", "foot", "mile"];
                            st.options.sort((lhs, rhs) => {
                                var lhsStep = 10, rhsStep = 10;
                                for (var i = 0; i < rangeSteps.length; i++) {
                                    if (i < lhsStep && lhs.name.indexOf(rangeSteps[i]) != -1) lhsStep = i;
                                    if (i < rhsStep && rhs.name.indexOf(rangeSteps[i]) != -1) rhsStep = i;
                                }
                                if (lhsStep < rhsStep) return -1;
                                if (rhsStep < lhsStep) return 1;
                                // Same step, regular sort
                                return lhs.name < rhs.name ? -1 : (lhs.name == rhs.name ? 0 : 1);
                            });
                            break;
                        default:
                            st.options.sort((lhs, rhs) => lhs.name < rhs.name ? -1 : (lhs.name == rhs.name ? 0 : 1));
                    }
                });
            }
        });
        this.criteriaReset = this.criteriaReset.bind(this);
        this.criteriaChange = this.criteriaChange.bind(this);
        this.buildSort = this.buildSort.bind(this);
        this.buildFilter = this.buildFilter.bind(this);
        this.selectSpell = this.selectSpell.bind(this);
        this.showMore = this.showMore.bind(this);
        this.isBookmarked = this.isBookmarked.bind(this);
        this.getVancianInfo = this.getVancianInfo.bind(this);
        this.changeVancianMode = this.changeVancianMode.bind(this);
        this.recalcVisibleSpells = this.recalcVisibleSpells.bind(this);
        this.clickBookmarkListSpell = this.clickBookmarkListSpell.bind(this);
        this.bookmarkListUpdate = this.bookmarkListUpdate.bind(this);
        this.activeBookmarkListUpdate = this.activeBookmarkListUpdate.bind(this);

        this.props.bookmarkManager.on(this.props.bookmarkManager.events.dataUpdate, this.bookmarkListUpdate);
        this.props.bookmarkManager.on(this.props.bookmarkManager.events.activeListUpdate, this.activeBookmarkListUpdate);
        this.componentWillUnmount = (function () {
            this.props.bookmarkManager.off(this.props.bookmarkManager.events.dataUpdate, this.bookmarkListUpdate);
            this.props.bookmarkManager.off(this.props.bookmarkManager.events.activeListUpdate, this.activeBookmarkListUpdate);
        }).bind(this);
        this.state.visibleSpells = this.state.spells.filter(this.buildFilter()).sort(this.buildSort())

        this.recalcVisibleSpellsThrottled = throttle(throttleMs, this.recalcVisibleSpells);
        this.recalcVisibleSpellsDebounced = debounce(debounceMs, this.recalcVisibleSpells);
    }
    changeVancianMode(mode) {
        this.setState({
            "vancianMode": mode
        });
    }
    clickBookmarkListSpell(s) {
        var newCriteria = getDefaultCriteria();
        newCriteria.displayMode = this.state.criteria.displayMode;
        newCriteria.spellName = s.name;
        this.setState({
            criteria: newCriteria
        });
        this.recalcVisibleSpells(newCriteria);
    }
    recalcVisibleSpells(criteria) {
        console.log("Recalcing....");
        // Accepts the criteria separate to setState cause with throttling it may not actually be in the state yet.
        this.setState({
            'visibleSpells': this.state.spells.filter(this.buildFilter(criteria)).sort(this.buildSort(criteria))
        });
    }
    bookmarkListUpdate(ev, args) {
        var types = JSON.parse(JSON.stringify(this.state.spellTypes));
        types.forEach(st => {
            if (st.matchBy == "bookmark") st.options = this.state.bookmarkLists.map(l => ({ "name": l.name, "value": l.id }));
        });
        this.setState({
            "bookmarkLists": args,
            "spellTypes": types
        });
    }
    activeBookmarkListUpdate(ev, args) {
        this.setState({
            "activeBookmarkList": args
        });
    }
    isBookmarked(spell) {
        return !!(this.state.activeBookmarkList && this.state.activeBookmarkList.spells[spell.name]);
    }
    getVancianInfo(spell) {
        if (!this.isBookmarked(spell)) return { 'enabled': false };
        if (this.state.activeBookmarkList.vancian != true) return { 'enabled': false };
        else {
            return {
                'enabled': true,
                'prep': this.state.activeBookmarkList.spells[spell.name].vancianPrep || 0,
                'cast': this.state.activeBookmarkList.spells[spell.name].vancianCast || 0,
                'alt': this.state.activeBookmarkList.spells[spell.name].alt || []
            }
        }
    }
    showMore() {
        this.setState((s) => { return { 'maxRows': s.maxRows + defaultMaxRows }; });
    }
    buildFilter(criteria) {
        if (!criteria) criteria = this.state.criteria;
        return (spell) => {
            if (criteria.spellName) {
                if (spell.name.toLowerCase().indexOf(criteria.spellName.toLowerCase()) === -1) return false;
            }
            if (criteria.spellType) {
                var spellType = this.state.spellTypes.find(t => t.name == criteria.spellType);
                switch (spellType.matchBy) {
                    case "bookmark":
                        if (criteria.spellOption) {
                            var list = this.state.bookmarkLists.find(l => l.id === criteria.spellOption);
                            if (list && !list.spells[spell.name]) return false;
                        }
                        break;
                    case "filter":
                        var match = true;
                        for (var filterField in spellType.filter) {
                            if (match && spell[filterField]) {
                                if (Array.isArray(spell[filterField]))
                                    match = spell[filterField].indexOf(spellType.filter[filterField]) !== -1;
                                else 
                                    match = spell[filterField] == spellType.filter[filterField];
                            }
                            else match = false;
                        }
                        return match;
                        break;
                    case "lookup":
                        if (criteria.spellOption) {
                            if (!spellType.lookup[criteria.spellOption]) return false;
                            if (spellType.lookup[criteria.spellOption].indexOf(spell.name) === -1) return false;
                        } else {
                            // For lookups, filter that it must be in one of the lists
                            var found = false;
                            for (var option in spellType.lookup) {
                                found = found || (spellType.lookup[option].indexOf(spell.name) !== -1);
                            }
                            if (!found) return false;
                        }
                        break;
                    case "list":
                        if (spellType.lookup.indexOf(spell.name) === -1) return false;
                        break;
                    case "array":
                        if (criteria.spellOption) {
                            if (!spell[spellType.match] || spell[spellType.match].indexOf(criteria.spellOption) == -1) return false;
                        }
                        break;
                    case "value":
                        if (criteria.spellOption) {
                            if (!spell[spellType.match] || spell[spellType.match] != criteria.spellOption) return false;
                        }
                        break;
                    case "contains":
                        if (!spell[spellType.match]) return false;
                        if (criteria.spellOption && spell[spellType.match].toLowerCase().indexOf(criteria.spellOption.toLowerCase()) === -1) return false;
                        break;
                }
            }
            if (criteria.levels.length > 0) {
                if (spell.type == 'Cantrip') {
                    if (criteria.levels.indexOf('C') === -1) return false;
                }
                else if (criteria.levels.indexOf(spell.level) === -1) return false;
            }
            return true;
        };
    }
    selectSpell(spell) {
        this.setState({
            selectedSpell: spell
        });
    }
    criteriaReset() {
        var newCriteria = getDefaultCriteria();
        newCriteria.displayMode = this.state.criteria.displayMode;
        this.setState({
            criteria: newCriteria
        });
        this.recalcVisibleSpells(newCriteria);
    }
    criteriaChange(name, value) {
        var criteria;
        if (name === "spellType") {
            var spellOption = "";
            var spellType = this.state.spellTypes.find(t => t.name == value);
            if (spellType && spellType.matchBy == "bookmark") spellOption = this.state.activeBookmarkList.id;
            criteria = update(this.state.criteria, {
                [name]: { $set: value },
                spellOption: { $set: spellOption }
            });
            this.setState({
                criteria: criteria,
                maxRows: defaultMaxRows
            });
        }
        else {
            criteria = update(this.state.criteria, {
                [name]: { $set: value }
            });
            this.setState({
                criteria: criteria,
                maxRows: defaultMaxRows
            });
        }
        if (name == "spellName") {
            if (value.length < throttleMaxChars || value.endsWith(' ')) this.recalcVisibleSpellsThrottled(criteria);
            else this.recalcVisibleSpellsDebounced(criteria);
        }
        else
            this.recalcVisibleSpells(criteria);
    }
    buildSort(criteria) {
        if (!criteria) criteria = this.state.criteria;
        return (lhs, rhs) => {
            switch (criteria.sortBy) {
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
        };
    }
    render() {
        var visibleSpells = this.state.visibleSpells;
        var truncated = false;
        if (visibleSpells.length > this.state.maxRows) {
            visibleSpells = visibleSpells.slice(0, this.state.maxRows);
            truncated = true;
        }

        var selectedSpell = this.state.selectedSpell;
        if ((!selectedSpell || !this.buildFilter()(selectedSpell)) && visibleSpells.length > 0)
            selectedSpell = visibleSpells[0];

        var detail = null;
        if (selectedSpell && this.state.criteria.displayMode == 'List')
            detail = <div className="col-sm selectedSpell">
                <SpellDetail spell={selectedSpell}
                    bookmarked={this.isBookmarked(selectedSpell)}
                    bookmarkManager={this.props.bookmarkManager}
                    vancian={this.getVancianInfo(selectedSpell)}
                    vancianMode={this.state.vancianMode}
                />
            </div>;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <SpellSearch
                            spellTypes={this.state.spellTypes}
                            sortOptions={["Name", "Level", "Actions"]}
                            displayModes={["List", "Details"]}
                            spellType={this.state.criteria.spellType}
                            spellOption={this.state.criteria.spellOption}
                            spellName={this.state.criteria.spellName}
                            sortBy={this.state.criteria.sortBy}
                            levels={this.state.criteria.levels}
                            displayMode={this.state.criteria.displayMode}
                            showDetails={this.state.criteria.showDetails}
                            onCriteriaChange={this.criteriaChange}
                            onCriteriaReset={this.criteriaReset}
                        />
                    </div>
                </div>
                {this.state.activeBookmarkList.vancian == true && <div className="row">
                    <div className="col-sm">
                        <BookmarkListSummary
                            listSpells={this.state.activeBookmarkList.spells}
                            listVancian={this.state.activeBookmarkList.vancian}
                            listName={this.state.activeBookmarkList.name}
                            spells={this.state.spells}
                            vancianMode={this.state.vancianMode}
                            onChangeVancianMode={this.changeVancianMode}
                            onClickSpell={this.clickBookmarkListSpell}
                            bookmarkManager={this.props.bookmarkManager} />
                    </div>
                </div>}
                <div className="row">
                    <div className={"col-sm spellList" + this.state.criteria.displayMode}>
                        <ul className="list-group">
                            {visibleSpells.map((s) => {
                                if (this.state.criteria.displayMode == "Details")
                                    return <SpellDetail
                                        key={s.name}
                                        spell={s}
                                        bookmarked={this.isBookmarked(s)}
                                        bookmarkManager={this.props.bookmarkManager}
                                        vancian={this.getVancianInfo(s)}
                                        vancianMode={this.state.vancianMode}
                                    />;
                                else
                                    return (<SpellListItem
                                        key={s.name}
                                        spell={s}
                                        selected={s == selectedSpell}
                                        onSelect={this.selectSpell}
                                    />);
                            })}
                            {truncated ? <li className="list-group-item list-group-item-info" onClick={this.showMore}>Show More...</li> : null}
                        </ul>
                    </div>
                    {detail}
                </div>
            </div>
        );
    }
};