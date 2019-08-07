import React from 'react';

// Turns out Paizo says no to using their icons. Sadness.
// If they ever become community use, flip this.
const canUseIcons = false; 

export default class ActionIcons extends React.PureComponent {
    renderIcon(action) {
        if (canUseIcons) return <img key={action} className="actions" src={"images/action-" + action + ".png"} alt={action} />
        else {
            return <span key={action} className={"actions actions-" + action}>
                {(() => {
                    switch (action) {
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
                            return action;
                    }
                })()}
            </span>;
        }
    }
    render() {
        if (Array.isArray(this.props.action)) {
            var output = this.props.action.map(a => this.renderIcon(a));
            // If we have 2 icons put " to " between
            if (output.length == 2) output.splice(1, 0, ' to ');
            return <span>{output}</span>;
        }
        else return this.renderIcon(this.props.action);
    }
}