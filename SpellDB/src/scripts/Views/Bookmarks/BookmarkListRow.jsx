import React from 'react';

export default class BookmarkListRow extends React.Component {
    constructor(props) {
        super(props);
        this.nameChanged = this.nameChanged.bind(this);
        this.saveList = this.saveList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleVancian = this.toggleVancian.bind(this);
    }
    toggleEdit() {
        this.props.onToggleEdit(this.props.SpellList);
    }
    toggleVancian() {
        this.props.onVancianChange(this.props.SpellList, !this.props.SpellList.vancian);
    }
    saveList() {
        this.props.onSaveList(this.props.SpellList);
    }
    deleteList() {
        this.props.onDeleteList(this.props.SpellList);
    }
    nameChanged(event) {
        this.props.onNameChange(this.props.SpellList, event.target.value);
    }
    render() {
        return <div className="container bookmarkListRow">
            <div className="row spellListHeaderRow">
                <div className={this.props.canDelete && !this.props.isEditList ? "col-8" : "col"}>List Name</div>
                {this.props.canDelete && !this.props.isEditList && <div className="col-4">&nbsp;</div>}
            </div>
            <div className="row spellListRow">
                <div className={this.props.canDelete && !this.props.isEditList ? "col-8" : "col"}>
                    <input className="form-control" type="text" name="name" value={this.props.SpellList.name} onChange={this.nameChanged} />
                </div>
                {this.props.canDelete && !this.props.isEditList && <div className="col-4 actions">
                    <a className="btn btn-outline-danger" onClick={this.deleteList}><i className="fas fa-trash-alt"></i></a>
                </div>}
            </div>
            <div className="row spellListDetailHeaderRow">
                <div className="col">Active</div>
                <div className="col">Vancian</div>
                <div className="col">Spells</div>
            </div>
            <div className="row spellListDetailRow">
                <div className="col">
                    <a className={"btn" + (this.props.isEditList ? " editList" : "")} onClick={this.toggleEdit}>
                        {this.props.isEditList ?
                            <i className="fas fa-check-circle"></i> :
                            <i className="far fa-circle"></i>
                        }
                    </a>
                </div>
                <div className="col">
                    <a className={"btn" + (this.props.SpellList.vancian ? " vancianList" : "")} onClick={this.toggleVancian}>
                        {this.props.SpellList.vancian ?
                            <i className="fas fa-check-circle"></i> :
                            <i className="far fa-circle"></i>
                        }
                    </a>
                </div>
                <div className="col">{this.props.SpellList.spellCount}</div>
            </div>
        </div>;
    }
};  