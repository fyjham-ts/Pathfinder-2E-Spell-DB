import React from 'react';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

export default class SpellSearch extends React.Component {
    constructor(props) {
        super(props);

        this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
    }
    handleLevelChange(newLevels) {
        if (newLevels.indexOf('x') !== -1) this.props.onCriteriaReset();
        else this.props.onCriteriaChange('levels', newLevels);
    }
    handleCriteriaChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.props.onCriteriaChange(name, value);
    }
    render() {
        var powerOption = null;
        var showPowerOptions = (this.props.powerType && this.props.powerOptions[this.props.powerType] && this.props.powerOptions[this.props.powerType].length > 1);

        var levelRows = [
            Array.from({ length: 4 }, (v, i) => i),
            Array.from({ length: 4 }, (v, i) => i + 4),
            Array.from({ length: 3 }, (v, i) => i + 8).concat('x')
        ];

        return (
            <form className="spell-search row">
                <CheckboxGroup className="col-md levels" name="levels" value={this.props.levels} onChange={this.handleLevelChange} checkboxDepth={3}>
                    {levelRows.map((lr) => {
                        return <div className="level-row" key={lr[0]}>
                            {lr.map((l) => {
                                return <span key={l} className="level-col">
                                    <Checkbox id={"spell-level-" + l} value={l} />
                                    <label htmlFor={"spell-level-" + l} className="form-check-label">{String(l)}</label>
                                </span>;
                            })}
                        </div>;
                    })}
                </CheckboxGroup>
                <div className="col-md criteria">
                    <div className="form-row">
                        <label htmlFor="spellName" className="col-form-label form-label d-none d-sm-block">Spell Name</label>
                        <div className="col">
                            <input className="form-control" id="spellName" name="spellName" type="text" value={this.props.spellName} onChange={this.handleCriteriaChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <label htmlFor="powerType" className="col-form-label form-label d-none d-sm-block">Spell Type</label>
                        <div className="col">
                            <select className="form-control" id="powerType" name="powerType" value={this.props.powerType} onChange={this.handleCriteriaChange}>
                                <option value="">All</option>
                                {this.props.powerTypes.map((p) => { return <option key={p} value={p}>{p}</option> })}
                            </select>
                        </div>
                    </div>
                    {showPowerOptions ?
                        <div className="form-row">
                            <label htmlFor="powerOption" className="col-form-label form-label d-none d-sm-block">Subtype</label>
                            <div className="col">
                                <select className="form-control" id="powerOption" name="powerOption" value={this.props.powerOption} onChange={this.handleCriteriaChange}>
                                    <option value="">All</option>
                                    {this.props.powerOptions[this.props.powerType].map((p) => { return <option key={p} value={p}>{p}</option> })}
                                </select>
                            </div>
                        </div>
                        : null}
                </div>
                <div className="col-md sort">
                    <div className="form-row">
                        <label htmlFor="sortBy" className="col-form-label form-label d-none d-sm-block">Sort By</label>
                        <div className="col">
                            <select className="form-control" id="sortBy" name="sortBy" value={this.props.sortBy} onChange={this.handleCriteriaChange}>
                                {this.props.sortOptions.map((p) => { return <option key={p} value={p}>{p}</option> })}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <label htmlFor="displayMode" className="col-form-label form-label d-none d-sm-block">Display As</label>
                        <div className="col">
                            <select className="form-control" id="displayMode" name="displayMode" value={this.props.displayMode} onChange={this.handleCriteriaChange}>
                                {this.props.displayModes.map((p) => { return <option key={p} value={p}>{p}</option> })}
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
};  