"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var spells = require("./../data/spells.json");
var bookmarkKey = "SpellDB_bookmarkLists";
var bookmarkActiveKey = "SpellDB_activeList";

var BookmarkManager = function () {
    function BookmarkManager() {
        _classCallCheck(this, BookmarkManager);

        this.events = {
            "dataUpdate": "spelllists-dataupdate",
            "activeListUpdate": "spelllists-activelistupdate"
        };
        this.bookmarkLists = window.localStorage.getItem(bookmarkKey);
        if (!this.bookmarkLists || !Array.isArray(this.bookmarkLists)) this.bookmarkLists = [{
            "name": "Default",
            "spells": {},
            "spellCount": 0
        }];

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
            if (triggers[event]) triggers[event].forEach(function (e) {
                return e(event, args);
            });
        };

        this.saveLists = function () {
            window.localStorage.setItem(bookmarkKey, this.bookmarkLists);
            this.emit(this.events.dataUpdate, this.getBookmarkLists());
        }.bind(this);

        this.saveActiveList = function () {
            window.localStorage.setItem(bookmarkActiveKey, this.activeList);
            this.emit(this.events.activeListUpdate, this.getActiveBookmarkList());
        }.bind(this);
    }

    _createClass(BookmarkManager, [{
        key: "setActiveList",
        value: function setActiveList(idx) {
            if (idx >= 0 && idx < this.bookmarkLists.length) {
                this.activeList = idx;
                this.saveActiveList();
            }
        }
    }, {
        key: "toggleSpell",
        value: function toggleSpell(name) {
            if (this.activeList == -1) return;else {
                if (!this.bookmarkLists[this.activeList].spells[name]) {
                    this.bookmarkLists[this.activeList].spells[name] = true;
                    this.bookmarkLists[this.activeList].spellCount++;
                } else {
                    delete this.bookmarkLists[this.activeList].spells[name];
                    this.bookmarkLists[this.activeList].spellCount--;
                }
            }
            this.saveLists();
        }
    }, {
        key: "getBookmarkLists",
        value: function getBookmarkLists() {
            return this.bookmarkLists;
        }
    }, {
        key: "getActiveBookmarkList",
        value: function getActiveBookmarkList() {
            return this.bookmarkLists[this.activeList];
        }
    }]);

    return BookmarkManager;
}();

exports.default = BookmarkManager;
;