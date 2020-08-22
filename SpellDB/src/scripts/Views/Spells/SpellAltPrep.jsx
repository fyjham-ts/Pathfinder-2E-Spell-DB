import React from 'react';
import VancianPrep from '../Bookmarks/VancianPrep.jsx';
import PropTypes from 'prop-types';

/**
 * Spell Alt Prep
 * Note: Not a pure component cause otherwise the vancian prep off alt doesn't update.
 * @augments {React.Component<Props, State>}
 */
export default class SpellAltPrep extends React.Component {
    static propTypes = {
        'spell': PropTypes.object.isRequired,
        'alt': PropTypes.object.isRequired,
        'allowReset': PropTypes.bool.isRequired,
        'allowCast': PropTypes.bool.isRequired,
        'allowPrep': PropTypes.bool.isRequired,
        'bookmarkManager': PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
        this.startEdit = this.startEdit.bind(this);
        this.applyEdit = this.applyEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleAltChange = this.handleAltChange.bind(this);
        this.remove = this.remove.bind(this);
    }
    handleAltChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value 
        });
    }
    remove() {
        this.props.bookmarkManager.removeAlt(this.props.spell.name, this.props.alt.id);
    }
    applyEdit() {
        var alt = JSON.parse(JSON.stringify(this.props.alt));
        alt.level = this.state.level;
        alt.tradition = this.state.tradition;
        this.props.bookmarkManager.updateAlt(this.props.spell.name, alt);
        this.setState({
            "editing": false
        });
    }
    cancelEdit() {
        this.setState({"editing": false});
    }
    startEdit() {
        this.setState({
            "editing": true,
            "level": this.props.alt.level,
            "tradition": this.props.alt.tradition,
            "validLevels": Array.from({ length: 10-this.props.spell.level }, (v, i) => i + this.props.spell.level)
        });
    }
    render() {
        var result;
        if (!this.state.editing) {
            result = <tr>
                <td>{this.props.alt.level}</td>
                <td>{this.props.alt.tradition}</td>
                <td>
                    <VancianPrep
                        type={this.props.spell.type}
                        cast={this.props.alt.cast}
                        prep={this.props.alt.prep}
                        bookmarkManager={this.props.bookmarkManager}
                        spellName={this.props.spell.name}
                        altId={this.props.alt.id}
                        allowPrep={this.props.allowPrep}
                        allowCast={this.props.allowCast}
                        allowReset={this.props.allowReset} />
                </td>
                <td className="altActions">
                    <i className="fas fa-edit" onClick={this.startEdit} />
                    <i className="fas fa-trash" onClick={this.remove} />
                </td>
            </tr>;
        } else {
            result = <tr>
                <td><select className="form-control" id="level" name="level" value={this.state.level} onChange={this.handleAltChange}>
                    {this.state.validLevels.map((l) => { return <option key={l} value={l}>{l}</option> })}
                </select></td>
                <td><select className="form-control" id="tradition" name="tradition" value={this.state.tradition} onChange={this.handleAltChange}>
                    <option value=""></option>
                    <option value="Primal">Primal</option>
                    <option value="Arcane">Arcane</option>
                    <option value="Divine">Divine</option>
                    <option value="Occult">Occult</option>
                </select></td>
                <td>
                    <VancianPrep
                        type={this.props.spell.type}
                        cast={this.props.alt.cast}
                        prep={this.props.alt.prep}
                        bookmarkManager={this.props.bookmarkManager}
                        spellName={this.props.spell.name}
                        altId={this.props.alt.id}
                        allowPrep={this.props.allowPrep}
                        allowCast={this.props.allowCast}
                        allowReset={this.props.allowReset} />
                </td>
                <td className="altActions">
                    <i className="far fa-check-circle" onClick={this.applyEdit} />
                </td>
            </tr>;
        }
        return result;
    }
}