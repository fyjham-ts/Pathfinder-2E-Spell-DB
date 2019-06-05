import React from 'react';
export default class SpellListItem extends React.PureComponent {
    render() {
        var spell = this.props.spell;
        var onSelect = () => this.props.onSelect(spell);
        var css = "spell-list-item list-group-item list-group-item-action" + (this.props.selected ? " active" : "");
        var description = null;
        if (spell.traditions.length > 0) {
            description = <span className="powerTypes">({spell.traditions.join(", ")})</span>
        }
        return (
            <li className={css} onClick={onSelect}>
                <span className={spell.type.toLowerCase() + " level rarity-" + spell.rarity}>{spell.level} </span>
                {spell.name.toLowerCase()} {description}
            </li>
        );
    }
}