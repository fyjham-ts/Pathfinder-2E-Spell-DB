import React from 'react';
import ReactMarkdown from 'react-markdown';

export default class SpellDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggleBookmark = this.toggleBookmark.bind(this);
    }
    toggleBookmark() {
        this.props.onBookmark(this.props.spell);
    }
    render() {
        var spell = this.props.spell;

        var actionDesc = {
            "S": "Somatic",
            "V": "Verbal",
            "M": "Material"
        };

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
        bodySections.push({ 'title': null, className: 'mainText', 'text': spell.description.main.replace(/ [-•] /g, '<br/> - ') });
        if (spell.description.subsections) {
            for (var section in spell.description.subsections) {
                var sectionTitle;
                var sectionClass;
                switch (section) {
                    case 'success': sectionTitle = 'Success'; sectionClass = 'save'; break;
                    case 'crit': sectionTitle = 'Critical Success'; sectionClass = 'save'; break;
                    case 'failure': sectionTitle = 'Failure'; sectionClass = 'save';break;
                    case 'crit-fail': sectionTitle = 'Critical Failure'; sectionClass = 'save';break;
                    default: sectionTitle = section; sectionClass = 'option'; break;
                }

                bodySections.push({
                    "title": <strong>{sectionTitle}</strong>,
                    "className": sectionClass,
                    "text": spell.description.subsections[section]
                });
            }
        }
        for (var level in spell.heightened) {
            bodySections.push({'title': <strong>Heightened({level})</strong>, 'className': 'heighten', 'text': spell.heightened[level] });
        }

        return (
            <div className="spellDetail clearfix">
                <div className="title">
                    <span className="spellClass">
                        <span className={this.props.bookmarked ? "bookmark active" : "bookmark inactive"} onClick={this.toggleBookmark}>
                            <i className={this.props.bookmarked ? "fas fa-bookmark" : "far fa-bookmark"} />
                        </span>
                        {spell.type} {spell.level}
                    </span>
                    {spell.name}
                </div>
                <ul className="traits">
                    {spell.traits.map((t, index) => {
                        return <li key={index}>{t}</li>
                    })}
                </ul>
                <div className="header">
                    <div><strong>Traditions</strong> {spell.traditions.join(", ")}</div>
                    <div><strong>Cast</strong> <img src={"images/action-" + spell.action + ".png"} className="actions" alt={spell.action} /> {spell.components.map(c => actionDesc[c]).join(", ")}</div>
                    {headerTokens.map((t) => {
                        return <span key={t.title} className="headerElement"><strong>{t.title}</strong> {t.value}</span>
                    })}
                </div>
                <div className="body">
                    {bodySections.map((s, index) => {
                        return <div key={index} className={s.className}>{s.title}<ReactMarkdown source={s.text} /></div>
                    })}
                </div>
            </div>
        )
    }
};