"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadSpellData = loadSpellData;
var spells = require("./../data/spells.json");
var spellTypes = require("./../data/spellTypes.json");
function loadSpellData() {

    return { spells: spells, spellTypes: spellTypes };
};