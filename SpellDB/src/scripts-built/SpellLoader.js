"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadSpellData = loadSpellData;
var spells = require("./../data/spells.json");
function loadSpellData() {
    return { spells: spells, powerTypes: [], powerOptions: [] };
};