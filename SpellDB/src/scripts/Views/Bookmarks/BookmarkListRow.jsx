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
        return (
            <tr className="spellListRow">
                <td><input className="form-control" type="text" name="name" value={this.props.SpellList.name} onChange={this.nameChanged} /></td>
                <td>{this.props.SpellList.spellCount}</td>
                <td>
                    <a className={"btn" + (this.props.isEditList ? " editList" : "")} onClick={this.toggleEdit}>
                        {this.props.isEditList ?
                            <i className="fas fa-check-circle"></i> :
                            <i className="far fa-circle"></i>
                        }
                    </a>
                </td>
                <td>
                    <a className={"btn" + (this.props.SpellList.vancian ? " vancianList" : "")} onClick={this.toggleVancian}>
                        {this.props.SpellList.vancian ?
                            <i className="fas fa-check-circle"></i> :
                            <i className="far fa-circle"></i>
                        }
                    </a>
                </td>
                <td className="actions">
                    {/*<a className="btn btn-outline-primary" onClick={this.saveList} title="Export list to file"><i className="fas fa-save"></i></a>*/}
                    {this.props.canDelete && !this.props.isEditList && <a className="btn btn-outline-danger" onClick={this.deleteList}><i className="fas fa-trash-alt"></i></a>}
                </td>
            </tr>
        )
    }
};  