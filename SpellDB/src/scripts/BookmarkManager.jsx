const spells = require("./../data/spells.json");
const bookmarkKey = "SpellDB_bookmarkLists";
const bookmarkActiveKey = "SpellDB_activeList";

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
export default class BookmarkManager {
    constructor() {
        this.events = {
            "dataUpdate": "spelllists-dataupdate",
            "activeListUpdate": "spelllists-activelistupdate"
        };
        this.bookmarkLists = null;
        try {
            this.bookmarkLists = JSON.parse(window.localStorage.getItem(bookmarkKey));
        }
        catch (ex) {
            this.bookmarkLists = null;
        }
        if (!this.bookmarkLists || !Array.isArray(this.bookmarkLists)) this.bookmarkLists = [
            {
                "id": uuidv4(),
                "name": "Default",
                "spells": {},
                "spellCount": 0
            }
        ];

        this.activeList = window.localStorage.getItem(bookmarkActiveKey);
        if (!this.activeList || this.activeList >= this.bookmarkLists.length) {
            this.activeList = 0;
        }

        var triggers = {};
        this.on = function (event, callback) {
            if (!triggers[event]) triggers[event] = [];
            triggers[event].push(callback);
        };
        this.off = function (event, callback) {
            if (!triggers[event]) return;
            for (var i = 0; i < triggers[event].length; i++) {
                if (triggers[event][i] === callback) triggers[event].splice(i, 1);
            }
        };
        this.emit = function (event, args) {
            if (triggers[event]) triggers[event].forEach(e => e(event, args));
        }

        this.saveLists = (function() {
            window.localStorage.setItem(bookmarkKey, JSON.stringify(this.bookmarkLists));
            this.emit(this.events.dataUpdate, this.getBookmarkLists());
        }).bind(this);

        this.saveActiveList = (function () {
            window.localStorage.setItem(bookmarkActiveKey, this.activeList);
            this.emit(this.events.activeListUpdate, this.getActiveBookmarkList());
        }).bind(this);
    }
    setActiveList(id) {
        var idx = this.getIndexFromId(id);
        if (idx != -1) {
            this.activeList = idx;
            this.saveActiveList();
        }
    }
    newList() {
        this.bookmarkLists.push({
            "id": uuidv4(),
            "name": "",
            "spells": {},
            "spellCount": 0
        });
        this.saveLists();
    }
    updateListName(id, name) {
        var idx = this.getIndexFromId(id);
        if (idx != -1) {
            this.bookmarkLists[idx].name = name;
        }
        this.saveLists();
    }
    deleteList(id) {
        if (this.bookmarkLists.length > 1) {
            var idx = this.getIndexFromId(id);
            if (idx != -1) {
                this.bookmarkLists.splice(idx, 1);
                if (this.activeList == idx) {
                    this.activeList--;
                    this.saveActiveList();
                }
                this.saveLists();
            }
        }
    }
    getIndexFromId(id) {
        for (var i = 0; i < this.bookmarkLists.length; i++) {
            if (this.bookmarkLists[i].id == id) {
                return i;
            }
        }
        return -1;
    }
    toggleSpell(name) {
        if (this.activeList == -1) return;
        else {
            if (!this.bookmarkLists[this.activeList].spells[name]) {
                this.bookmarkLists[this.activeList].spells[name] = true;
                this.bookmarkLists[this.activeList].spellCount++;
            }
            else {
                delete this.bookmarkLists[this.activeList].spells[name];
                this.bookmarkLists[this.activeList].spellCount--;
            }
        }
        this.saveLists();
    }
    getBookmarkLists() {
        return this.bookmarkLists;
    }
    getActiveBookmarkList() {
        return this.bookmarkLists[this.activeList];
    }
};