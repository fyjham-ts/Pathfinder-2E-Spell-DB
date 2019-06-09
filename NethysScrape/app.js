/*
 * Archives of Nethys Scraper - built against 1E to get it close to working before 2E launch.
 * Let's watch them redesign the site entirely...
 *
 * Note: Currently fumbles on spells with multiple on 1 page. I don't trust that'll stay as-is anyway so I'm not reworking. Heightening has removed most those anyway.
 */
'use strict';
const fs = require('fs');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const testRun = false;

var htmlTransform = (h) => cheerio.load(h);

const spellListRoot = "https://aonprd.com/Spells.aspx?Class=All";
const relativePath = "https://aonprd.com/";

async function loadSpell(url) {
    try {
        var $ = await rp({
            'uri': url,
            'transform': htmlTransform
        });
        var spellData = {
            'nethysUrl': url.href
        };
        var activeItem = null;
        $('#ctl00_MainContent_DataListTypes #ctl00_MainContent_DataListTypes_ctl00_LabelName').get(0).childNodes.forEach((elem, i) => {
            var e = cheerio(elem);
            if (e.is('b') || e.is('h3')) {
                if (activeItem) spellData[activeItem] = spellData[activeItem].trim();
                activeItem = e.text();
                spellData[activeItem] = "";
            }
            else if (e.is('h1')) {
                spellData.name = e.text().trim();
            }
            else if (activeItem) {
                spellData[activeItem] += e.text();
            }
        });
        return spellData;
    }
    catch (err) {
        console.error("Error loading spell page " + url);
        console.error(err);
    }
}

async function loadAllSpells() {
    try {
        var $ = await rp({
            'uri': spellListRoot,
            'transform': htmlTransform
        });
        var spells = [];
        var spellLinks = $('#ctl00_MainContent_DataListTypes span > a');
        for (var idx = 0; idx < spellLinks.length; idx++) {
            var a = spellLinks[idx];
            if (idx < 10 || !testRun) {
                var url = new URL(cheerio(a).attr('href'), relativePath);
                var spell = await loadSpell(url);
                spells.push(spell);
            }
        };
        console.log(spells);
        fs.writeFileSync("spells.json", JSON.stringify(spells));
    }
    catch (err) {
        console.error("Error loading root spell page");
        console.error(err);
    };
};
loadAllSpells();