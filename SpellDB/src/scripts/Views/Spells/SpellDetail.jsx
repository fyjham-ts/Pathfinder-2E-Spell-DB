import React from 'react';
import ReactMarkdown from 'react-markdown';
import { RemarkPlugins, RemarkRenderers } from '../Utils/RemarkExtensions.jsx';
import ActionIcons from '../Utils/ActionIcons.jsx';
import Trait from '../Utils/Trait.jsx';
import VancianPrep from '../Bookmarks/VancianPrep.jsx';

export default class SpellDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.addVancianPrep = this.addVancianPrep.bind(this);
        this.removeVancianPrep = this.removeVancianPrep.bind(this);
        this.addVancianCast = this.addVancianCast.bind(this);
        this.resetVancianCast = this.resetVancianCast.bind(this);
    }
    toggleBookmark() {
        this.props.onBookmark(this.props.spell);
    }
    getVancianIcon(mode) {
        switch (mode) {
            case 'prep': return 'fa-book';
            case 'cast': return 'fa-magic';
        }
    }
    addVancianCast() {
        this.props.onVancianCast(this.props.spell, 1);
    }
    resetVancianCast() {
        this.props.onVancianCast(this.props.spell, -(this.props.vancian.cast || 0));
    }
    addVancianPrep() {
        this.props.onVancianPrep(this.props.spell, 1);
    }
    removeVancianPrep() {
        this.props.onVancianPrep(this.props.spell, -1);
    }
    render() {
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
            bodySections.push({'title': <strong>Heightened({level}): </strong>, 'className': 'heighten', 'text': spell.heightened[level] });
        }

        return (
            <div className="spellDetail clearfix">
                <div className="title">
                    <span className="spellClass">
                        
                        {this.props.vancian.enabled && <VancianPrep
                            prep={this.props.vancian.prep}
                            cast={this.props.vancian.cast}
                            type={spell.type}
                            allowPrep={this.props.vancianMode == 'prep'}
                            allowCast={this.props.vancianMode == 'cast'}
                            allowReset={this.props.vancianMode == 'cast' || this.props.vancianMode == 'prep'}
                            onAddVancianPrep={this.addVancianPrep}
                            onRemoveVancianPrep={this.removeVancianPrep}
                            onCastVancian={this.addVancianCast}
                            onResetCastVancian={this.resetVancianCast}
                        />}
                        <span className={this.props.bookmarked ? "bookmark active" : "bookmark inactive"} onClick={this.toggleBookmark}>
                            <i className={this.props.bookmarked ? "fas fa-bookmark" : "far fa-bookmark"} />
                        </span>
                        {spell.type} {spell.level}
                    </span>
                    {spell.name}
                </div>
                <ul className="traits">
                    {spell.traits.map((t, index) => <Trait key={index} trait={t} />)}
                </ul>
                <div className="header">
                    {spell.traditions && <div><strong>Traditions</strong> {spell.traditions.join(", ")}</div>}
                    <div><strong>Cast</strong> <ActionIcons action={spell.action} /> {spell.components && spell.components.join(spell.componentsSeparator || ", ")}</div>
                    {headerTokens.map((t) => {
                        return <span key={t.title} className="headerElement"><strong>{t.title}</strong> {t.value}</span>
                    })}
                    {spell['saving throw'] && <div><span className="headerElement"><strong>Saving Throw</strong> {spell['saving throw']}</span></div>}
                </div>
                <div className="body">
                    {bodySections.map((s, index) => {
                        return <div key={index} className={s.className}>{s.title}<ReactMarkdown source={s.text} plugins={RemarkPlugins} renderers={RemarkRenderers} /></div>
                    })}
                </div>
            </div>
        )
    }
};