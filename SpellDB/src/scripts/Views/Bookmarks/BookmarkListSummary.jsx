import React from 'react';
import VancianPrep from './VancianPrep.jsx';

export default class BookmarkListSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'expanded': false
        };
        this.toggleExpand = this.toggleExpand.bind(this);
        this.addVancianPrep = this.addVancianPrep.bind(this);
        this.removeVancianPrep = this.removeVancianPrep.bind(this);
        this.addVancianCast = this.addVancianCast.bind(this);
        this.resetVancianCast = this.resetVancianCast.bind(this);
        this.changeModeOff = this.changeModeOff.bind(this);
        this.changeModeCast = this.changeModeCast.bind(this);
        this.changeModePrep = this.changeModePrep.bind(this);
        this.clickSpell = this.clickSpell.bind(this);
    }
    clickSpell(s) {
        this.props.onClickSpell(s);
    }
    changeModeOff(ev) {
        this.props.onChangeVancianMode("off");
        ev.stopPropagation();
    }
    changeModeCast(ev) {
        this.props.onChangeVancianMode("cast");
        ev.stopPropagation();
    }
    changeModePrep(ev) {
        this.props.onChangeVancianMode("prep");
        ev.stopPropagation();
    }
    addVancianCast(s) {
        this.props.onVancianCast(s.spell, 1);
    }
    resetVancianCast(s) {
        this.props.onVancianCast(s.spell, -(s.bookmark.vancianCast || 0));
    }
    addVancianPrep(s) {
        this.props.onVancianPrep(s.spell, 1);
    }
    removeVancianPrep(s) {
        this.props.onVancianPrep(s.spell, -1);
    }
    toggleExpand() {
        this.setState({
            'expanded': !this.state.expanded
        });
    }
    render() {
        var spellLevels = [];
        for (var spellName in this.props.listSpells) {
            var spell = this.props.spells.find(s => s.name == spellName);
            var score = spell.level;
            if (spell.type.toLowerCase() == 'cantrip') score = 0;
            if (spell.type.toLowerCase() == 'focus') score = score + 11;

            var listIdx = 0;
            while (listIdx < spellLevels.length && spellLevels[listIdx].score < score) listIdx++;

            if (listIdx == spellLevels.length) {
                spellLevels.push({
                    'score': score,
                    'type': spell.type,
                    'level': spell.level,
                    'spells': []
                });
            } else if (spellLevels[listIdx].score > score) {
                spellLevels.splice(listIdx, 0, {
                    'score': score,
                    'type': spell.type,
                    'level': spell.level,
                    'spells': []
                });
            }
            spellLevels[listIdx].spells.push({
                'spell': spell,
                'bookmark': this.props.listSpells[spellName]
            });
        }
        return <div className="bookmarkListSummary card">
            <div className="card-header" onClick={this.toggleExpand}>
                <span className="listName">
                    {this.props.listName}
                </span>
                <div className="modeToggle">
                    {/*<span className={"mode" + (this.props.vancianMode == "off" ? " active": "")} onClick={this.changeModeOff}>Off</span>*/}
                    <span className={"mode" + (this.props.vancianMode == "cast" ? " active" : "")} onClick={this.changeModeCast}>Cast</span>
                    <span className={"mode" + (this.props.vancianMode == "prep" ? " active" : "")} onClick={this.changeModePrep}>Prep</span>
                </div>
            </div>
            {this.state.expanded && <div className="card-body">
                {spellLevels.map((l, idx) => <div key={idx}>
                    <div>
                        <span className="spellLevel">{l.type} {l.level}</span>
                        ({l.spells.length} {this.props.listVancian ? "Known" : "Bookmarked"}
                        {this.props.listVancian && <span>, {l.spells.reduce((agg, s) => agg + (s.bookmark.vancianPrep || 0), 0)} Prepared</span>}
                        )
                    </div>
                    <ul>
                        {l.spells.map(s =>
                            <li key={s.spell.name}>
                                <a className="spellName" onClick={() => this.clickSpell(s.spell)}>{s.spell.name}</a>
                                {this.props.listVancian && <VancianPrep
                                    prep={s.bookmark.vancianPrep || 0}
                                    cast={s.bookmark.vancianCast || 0}
                                    type={s.spell.type}
                                    allowPrep={this.props.vancianMode == 'prep'}
                                    allowCast={this.props.vancianMode == 'cast'}
                                    allowReset={this.props.vancianMode == 'cast' || this.props.vancianMode == 'prep'}
                                    onAddVancianPrep={() => this.addVancianPrep(s)}
                                    onRemoveVancianPrep={() => this.removeVancianPrep(s)}
                                    onCastVancian={() => this.addVancianCast(s)}
                                    onResetCastVancian={() => this.resetVancianCast(s)}
                                />}
                            </li>
                        )}
                    </ul>
                </div>)}
            </div>}
        </div>;
    }
}