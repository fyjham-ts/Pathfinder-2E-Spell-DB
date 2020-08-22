import React from 'react';
import PropTypes from 'prop-types';
/**
 * Vancian Prep
 * @augments {React.PureComponent<Props, State>}
 */
export default class VancianPrep extends React.PureComponent {
    static propTypes = {
        'type': PropTypes.string.isRequired,
        'cast': PropTypes.number.isRequired,
        'prep': PropTypes.number.isRequired,
        'altId': PropTypes.string,
        'spellName': PropTypes.string.isRequired,
        'allowReset': PropTypes.bool.isRequired,
        'allowCast': PropTypes.bool.isRequired,
        'allowPrep': PropTypes.bool.isRequired,
        'bookmarkManager': PropTypes.object.isRequired
    }
    
    constructor(props) {
        super(props);
        this.removeVancianPrep = this.removeVancianPrep.bind(this);
        this.addVancianPrep = this.addVancianPrep.bind(this);
        this.castVancian = this.castVancian.bind(this);
        this.resetCastVancian = this.resetCastVancian.bind(this);
    }

    removeVancianPrep() {
        this.props.bookmarkManager.vancianPrep(this.props.spellName, -1, this.props.altId);
    }
    addVancianPrep() {
        this.props.bookmarkManager.vancianPrep(this.props.spellName, 1, this.props.altId);
    }
    castVancian() {
        this.props.bookmarkManager.vancianCast(this.props.spellName, 1, this.props.altId);
    }
    resetCastVancian() {
        this.props.bookmarkManager.vancianCast(this.props.spellName, -(this.props.cast || 0), this.props.altId);
    }
    render() {
        switch ((this.props.type || '').toLowerCase()) {
            case 'cantrip':
                return <span className="vancian cantrip">
                    <span className="action">
                        {!!this.props.prep && <i className="fas fa-magic" onClick={this.removeVancianPrep} />}
                        {!this.props.prep && <i className="fas fa-ban" onClick={this.addVancianPrep} />}
                    </span>
                </span>;
            case 'focus':
                return null;
            default:
                return <span className="vancian">
                    {this.props.cast > 0 && this.props.allowReset && <span className="action">
                        <i className="fas fa-undo" onClick={this.resetCastVancian} />
                    </span>}
                    {(this.props.cast < this.props.prep) && this.props.allowCast && <span className="action">
                        <i className="fas fa-magic" onClick={this.castVancian} />
                    </span>}
                    {(this.props.cast >= this.props.prep) && this.props.allowCast && <span className="action">
                        <i className="fas fa-ban" />
                    </span>}
                    <span className="item">{this.props.prep - this.props.cast}</span>
                    <span className="item">/</span>
                    <span className="item">{this.props.prep}</span>
                    {this.props.prep > 0 && this.props.allowPrep && <span className="action">
                        <i className="fas fa-minus-square" onClick={this.removeVancianPrep} />
                    </span>}
                    {this.props.allowPrep && <span className="action">
                        <i className="fas fa-plus-square" onClick={this.addVancianPrep} />
                    </span>}
                </span>;
        }
    }
}