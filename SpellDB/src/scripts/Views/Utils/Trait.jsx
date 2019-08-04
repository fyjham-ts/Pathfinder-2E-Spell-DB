import React from 'react';

// Turns out Paizo says no to using their icons. Sadness.
// If they ever become community use, flip this.
const canUseIcons = false; 

export default class Trait extends React.PureComponent {
    determineClass(trait) {
        switch (trait) {
            case "uncommon":
            case "rare":
            case "unique":
                return trait;
//                return "alignment";
            case "evil":
            case "good":
            case "chaotic":
            case "lawful":
            default:
                return "";
        }
    }
    render() {
        return <li className={this.determineClass(this.props.trait)}>{this.props.trait}</li>;
    }
}