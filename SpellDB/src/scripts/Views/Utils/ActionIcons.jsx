import React from 'react';
import { ThemeContext } from './../../Contexts/ThemeContext.jsx';

// Turns out Paizo says no to using their icons. Sadness.
// If they ever become community use, flip this.
const canUseIcons = true; 
const iconActions = ["1", "2", "3", "free", "reaction"];
export default class ActionIcons extends React.PureComponent {
    renderIcon(action, theme) {
        if (canUseIcons && iconActions.indexOf(action) != -1) {
            return <img key={action} className="actions" src={"images/action-" + action + (theme && theme.darkMode ? "-dark" : "") + ".png"} alt={action} />
        }
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
        return <ThemeContext.Consumer>
            {theme => {
                    if (Array.isArray(this.props.action)) {
                        var output = this.props.action.map(a => this.renderIcon(a, theme));
                        // If we have 2 icons put " to " between
                        if (output.length == 2) output.splice(1, 0, ' to ');
                        return <span>{output}</span>;
                    }
                    else return this.renderIcon(this.props.action, theme);
            }}
        </ThemeContext.Consumer>
    }
}