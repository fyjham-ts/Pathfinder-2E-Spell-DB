/*
 * Archives of Nethys Scraper - built against 1E to get it close to working before 2E launch.
 * Let's watch them redesign the site entirely...
 *
 * Note: Currently fumbles on spells with multiple on 1 page. I don't trust that'll stay as-is anyway so I'm not reworking. Heightening has removed most those anyway.
 */

/**
 * Current manual cleanups:
 * 3 action spells - the to goes in the components currently. Need to make the actions an array with all the options.
 * Casting time not measured in actions
 * Misses the uncommon trait (it has different CSS class - may also miss rare, alignment & size)
 * Diseases
 */

'use strict';
const fs = require('fs');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const testRun = false;
const testLimit = 5;
const testSpellId = 644;
const concurrentHttp = 10;
const oldSpellsPath = "../SpellDB/src/data/spells.json";

var htmlTransform = (h) => cheerio.load(h);

const spellListRoots = [
    "https://2e.aonprd.com/SpellLists.aspx?Focus=true&Tradition=0",
    "https://2e.aonprd.com/SpellLists.aspx?Tradition=1",
    "https://2e.aonprd.com/SpellLists.aspx?Tradition=2",
    "https://2e.aonprd.com/SpellLists.aspx?Tradition=3",
    "https://2e.aonprd.com/SpellLists.aspx?Tradition=4"
];
const relativePath = "https://2e.aonprd.com/";
var handledItems = [
    "name",
    "traits",
    "type",
    "level",
    "source",
    "traditions",
    "cast",
    "action",
    "range",
    "targets",
    "description",
    "components",
    "trigger",
    "area",
    "duration",
    "cost",
    "requirements",
    "casting-time"
];

function cleanup(s) {
    return s.replace(/^[ \t\n]+/,"").replace(/[ \t;\n]+$/,"").replace(/^;+/, "").replace(/;+$/, "").replace(/[��]/g, '-');
}
function formatList(e) {
    // If it has no items in it (Far more common than it should be) just ignore it. 
    if (e.has("li").length == 0) return ""; 
    return "\r\n * " + e.find("li").toArray()
        .map(li => formatDescriptionElementChildren(cheerio(li))) // Make an array of the text in the LI's
        .filter(s => !/^\s*$/.test(s)) // Drop any whitespace items
        .join("\r\n * ") // Join them as new list items
        + "\r\n\r\n\r\n"; // Break at the end so it ends the list
}
function formatTable(e) {
    /*
    Desired outcome:
    | head | head | head | head |
    | :---: | :---: | :---: | :---: |
    | val | val | val | val |
    */
    var rows = e.find("tr").toArray().map(r => cheerio(r).find("td").toArray().map(td => formatDescriptionElementChildren(cheerio(td))).join(" | "));
    rows.splice(1, 0, e.find("tr:nth-child(1)").toArray().map(r => cheerio(r).find("td").toArray().map(td => ":---:").join(" | ")));
    rows = rows.map(r => "| " + r + " |");
    return "\r\n\r\n" + rows.join("\r\n") + "\r\n";
}
function formatDescriptionElement(e) {
    if (e.is('span.trait') || e.is("span.traituncommon") || e.is("span.traitrare") || e.is("span.traitunique") || e.is("span.traitalignment") || e.is("span.traitsize")) {
        spellData.traits.push(e.text().toLowerCase());
    }
    else if ((e.is('b') || e.is('h3') || e.is('h2')) && e.text()) {
        return "**" + e.text() + "**";
    }
    else if (e.is('img.actiondark')) {
        switch (e.attr('src')) {
            case "Images\\Actions\\OneAction.png":
                return "|1|";
            case 'Images\\Actions\\TwoActions.png':
                return "|2|";
            case 'Images\\Actions\\ThreeActions.png':
                return "|3|";
            case 'Images\\Actions\\Reaction.png':
                return "|reaction|";
            case 'Images\\Actions\\FreeAction.png':
                return "|free|"
        }
    }
    else if (e.is("span.action-1")) {
        return "|1|";
    }
    else if (e.is("span.action-2")) {
        return "|2|";
    }
    else if (e.is("span.action-3")) {
        return "|3|";
    }
    else if (e.is("span.action-4")) {
        return "|reaction|";
    }
    else if (e.is("span.action-5")) {
        return "|free|";
    }
    else if (e.is('table')) {
        return formatTable(e);
    }
    else if (e.is("ul")) {
        return formatList(e);
    }
    else if (e.text()) {
        return e.text();
    }
}
function formatDescriptionElementChildren(e) {
    return e.get(0).childNodes.map(elem => formatDescriptionElement(cheerio(elem))).join("");
}
async function loadSpell(url) {
    try {
        var $ = await rp({
            'uri': url,
            'transform': htmlTransform
        });
        var spellData = {
            'nethysUrl': url.href
        };
        spellData.name = $('#ctl00_RadDrawer1_Content_MainContent_DetailedOutput h1.title').clone().find("> span, > img").remove().end().text().trim();
        spellData.traits = [];
        var typeString = $('h1.title span').text();
        var typeMatch = typeString.match("(.*) (\\+?[0-9]*)")
        if (typeMatch) {
            spellData.type = typeMatch[1];
            spellData.level = parseInt(typeMatch[2]);
        }
        else spellData.type = typeString;

        var activeItem = null;
        var subItem = null;
        $('#ctl00_RadDrawer1_Content_MainContent_DetailedOutput').get(0).childNodes.forEach((elem, i) => {
            var e = cheerio(elem);
            if (e.is('span.trait') || e.is("span.traituncommon") || e.is("span.traitrare") || e.is("span.traitunique") || e.is("span.traitalignment") || e.is("span.traitsize")) {
                spellData.traits.push(e.text().toLowerCase());
            }
            else if (e.is('h2.title') && /This Spell may contain spoilers/.test(e.text())) { /* Ignore it */ }
            else if (e.is('b') || e.is('h3') || e.is('h2')) {
                var newItem = e.text().toLowerCase();
                if ((handledItems.indexOf(newItem) == -1 || spellData[newItem]) && activeItem == "description") {
                    // Unhandled extras in desc - Just put them in bold
                    spellData[activeItem] += "  \r\n**" + e.text() + "** ";
                } else {
                    if (activeItem) {
                        if (subItem) { spellData[activeItem][subItem] = cleanup(spellData[activeItem][subItem]); }
                        else { spellData[activeItem] = cleanup(spellData[activeItem]); }
                    }
                    activeItem = e.text().toLowerCase();
                    subItem = null;

                    var heightenMatch = activeItem.match(/^(heightened) \(([0-9])[a-z]{2}\)$/);
                    if (heightenMatch) {
                        activeItem = heightenMatch[1];
                        subItem = heightenMatch[2];
                    }

                    if (subItem) {
                        if (!spellData[activeItem]) spellData[activeItem] = {};
                        spellData[activeItem][subItem] = "";
                    }
                    else spellData[activeItem] = "";
                }
            }
            else if (e.is('hr')) {
                if (activeItem) {
                    if (subItem) { spellData[activeItem][subItem] = cleanup(spellData[activeItem][subItem]); }
                    else { spellData[activeItem] = cleanup(spellData[activeItem]); }
                }
                activeItem = "description";
                subItem = null;
                if (!spellData[activeItem]) spellData[activeItem] = "";
            }
            else if (activeItem == 'cast' && e.is("span.action-1")) {
                if (spellData.action) spellData.actionMax = '1';
                else spellData.action = '1';
            }
            else if (activeItem == 'cast' && e.is("span.action-2")) {
                if (spellData.action) spellData.actionMax = '2';
                else spellData.action = '2';
            }
            else if (activeItem == 'cast' && e.is("span.action-3")) {
                if (spellData.action) spellData.actionMax = '3';
                else spellData.action = '3';
            }
            else if (activeItem == 'cast' && e.is("span.action-4")) {
                if (spellData.action) spellData.actionMax = 'reaction';
                else spellData.action = 'reaction';
            }
            else if (activeItem == 'cast' && e.is("span.action-5")) {
                if (spellData.action) spellData.actionMax = 'free';
                else spellData.action = 'free';
            }
            /*
            else if (e.is('img.actiondark')) {
                if (activeItem == 'cast') {
                    switch (e.attr('src')) {
                        case "Images\\Actions\\OneAction.png":
                            spellData.action = '1';
                            break;
                        case 'Images\\Actions\\TwoActions.png':
                            spellData.action = '2';
                            break;
                        case 'Images\\Actions\\ThreeActions.png':
                            spellData.action = '3';
                            break;
                        case 'Images\\Actions\\Reaction.png':
                            spellData.action = 'reaction';
                            break;
                        case 'Images\\Actions\\FreeAction.png':
                            spellData.action = 'free';
                            break;
                    }
                }
            }
            */
            else if (activeItem == "description" && e.is('table')) {
                if (subItem) { spellData[activeItem][subItem] += formatTable(e); }
                else { spellData[activeItem] += formatTable(e); }
            }
            else if (activeItem == "description" && e.is("ul")) {
                if (subItem) { spellData[activeItem][subItem] += formatList(e); }
                else { spellData[activeItem] += formatList(e); }
            }
            else if (activeItem && e.text()) {
                if (subItem) { spellData[activeItem][subItem] += e.text(); }
                else { spellData[activeItem] += e.text(); }
            }
        });
        // We've scraped, time for cleanup
        if (spellData.traditions) spellData.traditions = spellData.traditions.replace(/ /g, '').split(',');
        if (spellData.cast) spellData.components = spellData.cast.replace(/to /g, '').replace(/or /g, '').split(',').map(c => c.replace(/^[ ;]+/, '').replace(/[ ;]+$/g, ''));

        return spellData;
    }
    catch (err) {
        console.error("Error loading spell page " + url);
        console.error(err);
    }
}

async function loadAllSpells() {
    try {
        var oldSpellList = JSON.parse(fs.readFileSync(oldSpellsPath));
        var oldSpells = {};
        for (var i = 0; i < oldSpellList.length; i++) {
            oldSpells[oldSpellList[i].nethysUrl] = oldSpellList[i];
        }
        var spells = [];
        var loadedSpells = {};
        for (var ridx = 0; ridx < spellListRoots.length; ridx++) {
            var $ = await rp({
                'uri': spellListRoots[ridx],
                'transform': htmlTransform
            });
            console.log("Querying " + spellListRoots[ridx]);
            var spellLinks = $('#ctl00_RadDrawer1_Content_MainContent_DetailedOutput > a');
            var urlsToLoad = [];
            for (var idx = 0; idx < spellLinks.length && (!testRun || spells.length < testLimit); idx++) {
                var a = spellLinks[idx];
                var spellUrl = cheerio(a).attr('href');
                if (!loadedSpells[spellUrl] && /Spells\.aspx/.test(spellUrl)) {
                    loadedSpells[spellUrl] = true;
                    var url = new URL(spellUrl, relativePath);
                    if (oldSpells[url] && oldSpells[url].custom) {
                        spells.push(oldSpells[url]);
                    } else {
                        urlsToLoad.push(url);
                    }
                }
            }
            var originalLength = urlsToLoad.length;
            while (urlsToLoad.length) {
                var from = (originalLength - urlsToLoad.length + 1);
                var to = (originalLength - urlsToLoad.length + concurrentHttp);
                if (to > originalLength) to = originalLength;
                var pct = Math.round((100 * (originalLength - urlsToLoad.length)) / originalLength);
                console.log("Reading spells... List " + (ridx + 1) + "/" + spellListRoots.length + ": " + pct + "% (Reading " + from + " to " + to + "/"  + originalLength + ")");
                var newSpells = await Promise.all(urlsToLoad.splice(0, concurrentHttp).map(url => loadSpell(url)));
                spells.push(... newSpells);
            }
        }
        console.log(spells);
        if (!testRun) fs.writeFileSync("spells.json", JSON.stringify(spells));
    }
    catch (err) {
        console.error("Error loading root spell page");
        console.error(err);
    };
};
async function testSpell(id) {
    var url = new URL("/spells.aspx?ID=" + id, relativePath);
    var spell = await loadSpell(url);
    console.log(spell);
}
if (testRun && testSpellId) {
    testSpell(testSpellId);
}
else loadAllSpells();