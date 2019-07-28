import React from 'react';

// Turns out Paizo says no to using their icons. Sadness.
// If they ever become community use, flip this.
const canUseIcons = false; 

export default class ActionIcons extends React.PureComponent {
    render() {
        if (canUseIcons) return <img className="actions" src={"images/action-" + this.props.action + ".png"} alt={this.props.action} />
        else {
            return <span className={"actions actions-" + this.props.action}>
                {(() => {
                    switch (this.props.action) {
                        case "1":
                            return "◈";
                        case "2":
                            return "◈◈";
                        case "3":
                            return "◈◈◈";
                        case "free":
                            return "◇"; // "⟐";
                        case "reaction":
                            return "⤾";
                        default:
                            return this.props.action;
                    }
                })()}
            </span>;
        }
    }
}