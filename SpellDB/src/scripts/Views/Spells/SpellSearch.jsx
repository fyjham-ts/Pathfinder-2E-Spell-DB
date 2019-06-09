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
        var spellOption = null;
        var showSpellOptions = (this.props.spellType && this.props.spellTypes.find(t => t.name == this.props.spellType).options.length > 1);

        var levelRows = [
            Array.from({ length: 6 }, (v, i) => i),
            Array.from({ length: 5 }, (v, i) => i + 6).concat('x')
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
                        <label htmlFor="spellName" className="col-form-label form-label">Search</label>
                        <div className="col">
                            <input className="form-control" id="spellName" name="spellName" type="text" value={this.props.spellName} onChange={this.handleCriteriaChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <label htmlFor="spellType" className="col-form-label form-label">Type</label>
                        <div className="col">
                            <select className="form-control" id="spellType" name="spellType" value={this.props.spellType} onChange={this.handleCriteriaChange}>
                                <option value="">All</option>
                                {this.props.spellTypes.map((p) => { return <option key={p.name} value={p.name}>{p.name}</option> })}
                            </select>
                        </div>
                    </div>
                    {showSpellOptions ?
                        <div className="form-row">
                            <label htmlFor="spellOption" className="col-form-label form-label">Subtype</label>
                            <div className="col">
                                <select className="form-control" id="spellOption" name="spellOption" value={this.props.spellOption} onChange={this.handleCriteriaChange}>
                                    <option value="">All</option>
                                    {this.props.spellTypes.find(t => t.name == this.props.spellType).options.map((p) => { return <option key={p.value} value={p.value}>{p.name}</option> })}
                                </select>
                            </div>
                        </div>
                        : null}
                </div>
                <div className="col-md sort">
                    <div className="form-row">
                        <label htmlFor="sortBy" className="col-form-label form-label">Sort By</label>
                        <div className="col">
                            <select className="form-control" id="sortBy" name="sortBy" value={this.props.sortBy} onChange={this.handleCriteriaChange}>
                                {this.props.sortOptions.map((p) => { return <option key={p} value={p}>{p}</option> })}
                            </select>
                        </div>
                    </div>
                    <div className="form-row d-none d-sm-block">
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