import React from 'react';
import update from 'immutability-helper';
import BookmarkListRow from './BookmarkListRow.js';

export default class BookmarkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'lists': this.props.bookmarkManager.getBookmarkLists(),
            'editList': this.props.bookmarkManager.getActiveBookmarkList().id
        };
        this.onToggleEdit = this.onToggleEdit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDeleteList = this.onDeleteList.bind(this);
        this.onSaveList = this.onSaveList.bind(this);
        this.onLoadList = this.onLoadList.bind(this);
        this.onAddList = this.onAddList.bind(this);

        this.bookmarkListUpdate = this.bookmarkListUpdate.bind(this);
        this.activeBookmarkListUpdate = this.activeBookmarkListUpdate.bind(this);

        this.props.bookmarkManager.on(this.props.bookmarkManager.events.dataUpdate, this.bookmarkListUpdate);
        this.props.bookmarkManager.on(this.props.bookmarkManager.events.activeListUpdate, this.activeBookmarkListUpdate);
        this.componentWillUnmount = (function () {
            this.props.bookmarkManager.off(this.props.bookmarkManager.events.dataUpdate, this.bookmarkListUpdate);
            this.props.bookmarkManager.off(this.props.bookmarkManager.events.activeListUpdate, this.activeBookmarkListUpdate);
        }).bind(this);
    }
    bookmarkListUpdate(ev, args) {
        this.setState({ 'lists': args })
    }
    activeBookmarkListUpdate(ev, args) {
        this.setState({ 'editList': args.id })
    }
    onToggleEdit(list) {
        if (this.state.editList != list.id) {
            this.props.bookmarkManager.setActiveList(list.id);
        }
    }
    onSaveList(list) {
        // TODO
    }
    onLoadList(list) {
        //TODO
    }
    onDeleteList(list) {
        this.props.bookmarkManager.deleteList(list.id);
    }
    onAddList() {
        this.props.bookmarkManager.newList();
    }
    onNameChange(list, value) {
        this.props.bookmarkManager.updateListName(list.id, value);
    }
    render() {
        return (
            <div className="spellListConfig">
                <p className="alert alert-info">Bookmarks help you mark some related spells. Whether it be your spell book, the spells you'll need as GM for an encounter, or just a few spells you're interested in checking out later.</p>
                <table className="table spellListTable">
                    <thead>
                        <tr>
                            <th>List Name</th>
                            <th>Spells</th>
                            <th>Editing</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lists.map((l) => <BookmarkListRow
                            key={l.id}
                            SpellList={l}
                            canDelete={this.state.lists.length > 1}
                            isEditList={l.id == this.state.editList}
                            onNameChange={this.onNameChange}
                            onDeleteList={this.onDeleteList}
                            onSaveList={this.onSaveList}
                            onToggleEdit={this.onToggleEdit} />
                        )}
                    </tbody>
                </table>
                <div className="global-actions">
                    <button className="btn btn-success" onClick={this.onAddList}>
                        <i className="fas fa-plus"></i>&nbsp;&nbsp;Create New List
                    </button>
                    {/*
                        <button className="btn btn-secondary" onClick={this.onLoadList}>
                            <i className="fas fa-file-upload"></i>&nbsp;&nbsp;Load From File
                        </button>
                    */}
                </div>
            </div>
        )
    }
};  