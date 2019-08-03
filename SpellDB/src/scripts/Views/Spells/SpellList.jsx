import React from 'react';
//import { ipcRenderer } from 'electron';
import SpellSearch from './SpellSearch.js';
import SpellListItem from './SpellListItem.js';
import SpellDetail from './SpellDetail.js';
import update from 'immutability-helper';
import { loadSpellData } from '../../SpellLoader.js';

let { spells, spellTypes } = loadSpellData();

spellTypes.sort((lhs, rhs) => lhs.name < rhs.name ? -1 : (lhs.name > rhs.name ? 1 : 0));

var defaultMaxRows = 50;
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
            activeBookmarkList: this.props.bookmarkManager.getActiveBookmarkList()
        };
        this.state.spellTypes.forEach(st => {
            if (st.matchBy == "bookmark") st.options = this.state.bookmarkLists.map(l => ({ "name": l.name, "value": l.id }));
            if (st.matchBy == "array" && st.options == null) {
                // Doing this every load may be too slow with all the spells. If it is, move this to a preprocessor build script for spell types.
                st.options = [];
                var added = {};
                this.state.spells.forEach(s => {
                    var opts = s[st.match];
                    if (opts && Array.isArray(opts)) {
                        opts.forEach(o => {
                            if (o.length > 0 && !added[o]) {
                                added[o] = true;
                                st.options.push({ "name": o.charAt(0).toUpperCase() + o.slice(1), "value": o });
                            }
                        });
                    }
                    st.options.sort((lhs, rhs) => lhs.name < rhs.name ? -1 : (lhs.name == rhs.name ? 0 : 1));
                });
            }
        });
        this.criteriaReset = this.criteriaReset.bind(this);
        this.criteriaChange = this.criteriaChange.bind(this);
        this.criteriaSort = this.criteriaSort.bind(this);
        this.meetsCriteria = this.meetsCriteria.bind(this);
        this.selectSpell = this.selectSpell.bind(this);
        this.showMore = this.showMore.bind(this);
        this.isBookmarked = this.isBookmarked.bind(this);
        this.bookmarkSpell = this.bookmarkSpell.bind(this);

        this.bookmarkListUpdate = this.bookmarkListUpdate.bind(this);
        this.activeBookmarkListUpdate = this.activeBookmarkListUpdate.bind(this);

        this.props.bookmarkManager.on(this.props.bookmarkManager.events.dataUpdate, this.bookmarkListUpdate);
        this.props.bookmarkManager.on(this.props.bookmarkManager.events.activeListUpdate, this.activeBookmarkListUpdate);
        this.componentWillUnmount = (function () {
            this.props.bookmarkManager.off(this.props.bookmarkManager.events.dataUpdate, this.bookmarkListUpdate);
            this.props.bookmarkManager.off(this.props.bookmarkManager.events.activeListUpdate, this.activeBookmarkListUpdate);
        }).bind(this);
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
    bookmarkSpell(spell) {
        this.props.bookmarkManager.toggleSpell(spell.name);
    }
    showMore() {
        this.setState((s) => { return { 'maxRows': s.maxRows + defaultMaxRows }; });
    }
    meetsCriteria(spell) {
        if (this.state.criteria.spellName) {
            if (spell.name.toLowerCase().indexOf(this.state.criteria.spellName.toLowerCase()) === -1) return false;
        }
        if (this.state.criteria.spellType && this.state.criteria.spellOption) {
            var spellType = this.state.spellTypes.find(t => t.name == this.state.criteria.spellType);
            switch (spellType.matchBy) {
                case "bookmark":
                    var list = this.state.bookmarkLists.find(l => l.id === this.state.criteria.spellOption);
                    if (list && !list.spells[spell.name]) return false;
                    break;
                case "array":
                    if (spell[spellType.match] && spell[spellType.match].indexOf(this.state.criteria.spellOption) == -1) return false;
                    break;
            }
        }
        if (this.state.criteria.levels.length > 0) {
            if (spell.type == 'Cantrip') {
                if (this.state.criteria.levels.indexOf('C') === -1) return false;
            }
            else if (this.state.criteria.levels.indexOf(spell.level) === -1) return false;
        }
        return true;
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
    }
    criteriaChange(name, value) {
        if (name === "spellType") {
            var spellOption = "";
            var spellType = this.state.spellTypes.find(t => t.name == value);
            if (spellType && spellType.matchBy == "bookmark") spellOption = this.state.activeBookmarkList.name;
            this.setState({
                criteria: update(this.state.criteria, {
                    [name]: { $set: value },
                    spellOption: { $set: spellOption }  
                }),
                maxRows: defaultMaxRows
            });
        }
        else {
            this.setState({
                criteria: update(this.state.criteria, {
                    [name]: { $set: value }
                }),
                maxRows: defaultMaxRows
            });
        }
    }
    criteriaSort(lhs, rhs) {
        switch (this.state.criteria.sortBy) {
            case "Name":
                if (lhs.name.toLowerCase() < rhs.name.toLowerCase()) return -1;
                if (lhs.name.toLowerCase() > rhs.name.toLowerCase()) return 1;
                return 0;
            case "Level":
                if (lhs.level - rhs.level != 0) return lhs.level - rhs.level;
                if (lhs.name.toLowerCase() < rhs.name.toLowerCase()) return -1;
                if (lhs.name.toLowerCase() > rhs.name.toLowerCase()) return 1;
                break;
        }
    }
    render() {
        var visibleSpells = this.state.spells.filter(this.meetsCriteria).sort(this.criteriaSort);
        var truncated = false;
        if (visibleSpells.length > this.state.maxRows) {
            visibleSpells = visibleSpells.slice(0, this.state.maxRows);
            truncated = true;
        }

        var selectedSpell = this.state.selectedSpell;
        if ((!selectedSpell || !this.meetsCriteria(selectedSpell)) && visibleSpells.length > 0)
            selectedSpell = visibleSpells[0];

        var detail = null;
        if (selectedSpell && this.state.criteria.displayMode == 'List')
            detail = <div className="col-sm selectedSpell">
                <SpellDetail spell={selectedSpell}
                    bookmarked={this.isBookmarked(selectedSpell)}
                    onBookmark={this.bookmarkSpell}
                />
            </div>;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <SpellSearch
                            spellTypes={this.state.spellTypes}
                            sortOptions={["Name", "Level"]}
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
                <div className="row">
                    <div className={"col-sm spellList" + this.state.criteria.displayMode}>
                        <ul className="list-group">
                            {visibleSpells.map((s) => {
                                if (this.state.criteria.displayMode == "Details")
                                    return <SpellDetail
                                        key={s.name}
                                        spell={s}
                                        bookmarked={this.isBookmarked(s)}
                                        onBookmark={this.bookmarkSpell}
                                    />;
                                else
                                    return (<SpellListItem
                                        key={s.name}
                                        spell={s}
                                        selected={s == selectedSpell}
                                        onSelect={this.selectSpell}
                                    />);
                            })}
                            {truncated ? <li className="list-group-item list-group-item-info"><a onClick={this.showMore}>Show More...</a></li> : null}
                        </ul>
                    </div>
                    {detail}
                </div>
            </div>
        );
    }
};