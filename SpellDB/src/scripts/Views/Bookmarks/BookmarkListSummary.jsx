import React from 'react';
import VancianPrep from './VancianPrep.jsx';

export default class BookmarkListSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'expanded': false
        };
        this.toggleExpand = this.toggleExpand.bind(this);
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
    toggleExpand() {
        this.setState({
            'expanded': !this.state.expanded
        });
    }
    render() {
        var spellLevels = [];
        var addSpell = function(spell, listSpell, alt) {
            var score = (alt || spell).level;
            if (spell.type.toLowerCase() == 'cantrip') score = 0;
            if (spell.type.toLowerCase() == 'focus') score = score + 11;

            var listIdx = 0;
            while (listIdx < spellLevels.length && spellLevels[listIdx].score < score) listIdx++;

            if (listIdx == spellLevels.length) {
                spellLevels.push({
                    'score': score,
                    'type': spell.type,
                    'level': (alt || spell).level,
                    'spells': []
                });
            } else if (spellLevels[listIdx].score > score) {
                spellLevels.splice(listIdx, 0, {
                    'score': score,
                    'type': spell.type,
                    'level': (alt || spell).level,
                    'spells': []
                });
            }
            var laterNameIdx = spellLevels[listIdx].spells.findIndex(s => s.spell.name > spell.name);
            var spellListObj = {
                'title': spell.name,
                'spell': spell,
                'altId': alt ? alt.id : null,
                'prep': alt ? alt.prep : listSpell.vancianPrep,
                'cast': alt ? alt.cast : listSpell.vancianCast
            };
            if (alt && alt.level > spell.level) spellListObj.title += " (Heightened)";
            if (laterNameIdx == -1) {
                spellLevels[listIdx].spells.push(spellListObj);
            } 
            else {
                spellLevels[listIdx].spells.splice(laterNameIdx, 0, spellListObj);
            }
        };
        for (var spellName in this.props.listSpells) {
            var spell = this.props.spells.find(s => s.name == spellName);
            if (!spell) break;
            var listSpell = this.props.listSpells[spellName];
            addSpell(spell, listSpell);
            if (listSpell.alt) {
                for (var i=0; i < listSpell.alt.length; i++) {
                    addSpell(spell, listSpell, listSpell.alt[i]);
                }
            }
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
                        {this.props.listVancian && <span>, {l.spells.reduce((agg, s) => agg + (s.prep || 0), 0)} Prepared</span>}
                        )
                    </div>
                    <ul className="spells">
                        {l.spells.map(s =>
                            <li key={s.spell.name}>
                                <a className="spellName" onClick={() => this.clickSpell(s.spell)}>{s.title}</a>
                                {this.props.listVancian && <VancianPrep
                                    prep={s.prep || 0}
                                    cast={s.cast || 0}
                                    type={s.spell.type}
                                    altId={s.altId}
                                    allowPrep={this.props.vancianMode == 'prep'}
                                    allowCast={this.props.vancianMode == 'cast'}
                                    allowReset={this.props.vancianMode == 'cast' || this.props.vancianMode == 'prep'}
                                    bookmarkManager={this.props.bookmarkManager}
                                    spellName={s.spell.name}
                                />}
                            </li>
                        )}
                    </ul>
                </div>)}
            </div>}
        </div>;
    }
}