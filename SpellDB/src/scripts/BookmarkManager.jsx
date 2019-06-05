const spells = require("./../data/spells.json");
const bookmarkKey = "SpellDB_bookmarkLists";
const bookmarkActiveKey = "SpellDB_activeList";

export default class BookmarkManager {
    constructor() {
        this.events = {
            "dataUpdate": "spelllists-dataupdate",
            "activeListUpdate": "spelllists-activelistupdate"
        };
        this.bookmarkLists = window.localStorage.getItem(bookmarkKey);
        if (!this.bookmarkLists || !Array.isArray(this.bookmarkLists)) this.bookmarkLists = [
            {
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
        this.emit = function (event, args) {
            if (triggers[event]) triggers[event].forEach(e => e(event, args));
        }

        this.saveLists = (function() {
            window.localStorage.setItem(bookmarkKey, this.bookmarkLists);
            this.emit(this.events.dataUpdate, this.getBookmarkLists());
        }).bind(this);

        this.saveActiveList = (function () {
            window.localStorage.setItem(bookmarkActiveKey, this.activeList);
            this.emit(this.events.activeListUpdate, this.getActiveBookmarkList());
        }).bind(this);
    }
    setActiveList(idx) {
        if (idx >= 0 && idx < this.bookmarkLists.length) {
            this.activeList = idx;
            this.saveActiveList();
        }
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