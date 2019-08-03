"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var About = function (_React$Component) {
    _inherits(About, _React$Component);

    function About(props) {
        _classCallCheck(this, About);

        var _this = _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).call(this, props));

        _this.state = {
            "oglExpanded": false
        };
        return _this;
    }

    _createClass(About, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "about" },
                _react2.default.createElement(
                    "h2",
                    null,
                    "About"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "This was created to help people quickly look up info for their 2E games - if you have some fun with it that's great! I wrote a similar one for playtest for my local group. This time I ported to web and mobile & figured I'd let others know about it."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "The full code is available on GitHub - ",
                    _react2.default.createElement(
                        "a",
                        { target: "_blank", href: "https://github.com/fyjham-ts/Pathfinder-2E-Spell-DB" },
                        "https://github.com/fyjham-ts/Pathfinder-2E-Spell-DB"
                    ),
                    " - I'd love to hear your input. If you hit any bugs or want to request a feature, raise a GitHub issue!"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "I'm a big fan of Paizo and I respect their hard work making my favourite hobby more fun. I've done this all in good faith, and will take down at a simple request from anyone from Paizo (Whether I've breached any license or not - if this bothers them I don't want to do it)."
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "Credits"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "Code written by Tim Schneider"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "OGL & Community Use content from Paizo HEAVILY used."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "Data gathered as a mix of scraping from ",
                    _react2.default.createElement(
                        "a",
                        { href: "https://www.aonprd.com" },
                        "Archives of Nethys"
                    ),
                    " and mind-numbing data entry. I wouldn't have been able to do this if I had to enter it all from scratch. They did the hard legwork."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "For tech dependencies check out the GitHub."
                ),
                _react2.default.createElement(
                    "h2",
                    null,
                    "License Stuff"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "I'm a programmer not a lawyer, below comes the things I think I have to say to keep the legal people happy. Content from Paizo is licensed under OGL or Community Use as appropriate. My code is all available under MIT license."
                ),
                _react2.default.createElement(
                    "h3",
                    null,
                    "OGL"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc. (\u201CWizards\u201D). All Rights Reserved.",
                    _react2.default.createElement("br", null),
                    "1. Definitions: (a) \u201CContributors\u201D means the copyright and/or trademark owners who have contributed Open Game Content; (b) \u201CDerivative Material\u201D means copyrighted material including derivative works and translations (including into other computer languages), potation, modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other form in which an existing work may be recast, transformed or adapted; (c) \u201CDistribute\u201D means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or otherwise distribute; (d) \u201COpen Game Content\u201D means the game mechanic and includes the methods, procedures, processes and routines to the extent such content does not embody the Product Identity and is an enhancement over the prior art and any additional content clearly identified as Open Game Content by the Contributor, and means any work covered by this License, including translations and derivative works under copyright law, but specifically excludes Product Identity. (e) \u201CProduct Identity\u201D means product and product line names, logos and identifying marks including trade dress; artifacts, creatures, characters, stories, storylines, plots, thematic elements, dialogue, incidents, language, artwork, symbols, designs, depictions, likenesses, formats, poses, concepts, themes and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells, enchantments, personalities, teams, personas, likenesses and special abilities; places, locations, environments, creatures, equipment, magical or supernatural abilities or effects, logos, symbols, or graphic designs; and any other trademark or registered trademark clearly identified as Product identity by the owner of the Product Identity, and which specifically excludes the Open Game Content; (f) \u201CTrademark\u201D means the logos, names, mark, sign, motto, designs that are used by a Contributor to identify itself or its products or the associated products contributed to the Open Game License by the Contributor (g) \u201CUse\u201D, \u201CUsed\u201D or \u201CUsing\u201D means to use, Distribute, copy, edit, format, modify, translate and otherwise create Derivative Material of Open Game Content. (h) \u201CYou\u201D or \u201CYour\u201D means the licensee in terms of this agreement.",
                    _react2.default.createElement("br", null),
                    "2. The License: This License applies to any Open Game Content that contains a notice indicating that the Open Game Content may only be Used under and in terms of this License. You must affix such a notice to any Open Game Content that you Use. No terms may be added to or subtracted from this License except as described by the License itself. No other terms or conditions may be applied to any Open Game Content distributed using this License.",
                    _react2.default.createElement("br", null),
                    "3. Offer and Acceptance: By Using the Open Game Content You indicate Your acceptance of the terms of this License.",
                    _react2.default.createElement("br", null),
                    "4. Grant and Consideration: In consideration for agreeing to use this License, the Contributors grant You a perpetual, worldwide, royalty-free, non-exclusive license with the exact terms of this License to Use, the Open Game Content.",
                    _react2.default.createElement("br", null),
                    "5. Representation of Authority to Contribute: If You are contributing original material as Open Game Content, You represent that Your Contributions are Your original creation and/or You have sufficient rights to grant the rights conveyed by this License.",
                    _react2.default.createElement("br", null),
                    "6. Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include the exact text of the COPYRIGHT NOTICE of any Open Game Content You are copying, modifying or distributing, and You must add the title, the copyright date, and the copyright holder\u2019s name to the COPYRIGHT NOTICE of any original Open Game Content you Distribute.",
                    _react2.default.createElement("br", null),
                    "7. Use of Product Identity: You agree not to Use any Product Identity, including as an indication as to compatibility, except as expressly licensed in another, independent Agreement with the owner of each element of that Product Identity. You agree not to indicate compatibility or co-adaptability with any Trademark or Registered Trademark in conjunction with a work containing Open Game Content except as expressly licensed in another, independent Agreement with the owner of such Trademark or Registered Trademark. The use of any Product Identity in Open Game Content does not constitute a challenge to the ownership of that Product Identity. The owner of any Product Identity used in Open Game Content shall retain all rights, title and interest in and to that Product Identity.",
                    _react2.default.createElement("br", null),
                    "8. Identification: If you distribute Open Game Content You must clearly indicate which portions of the work that you are distributing are Open Game Content.",
                    _react2.default.createElement("br", null),
                    "9. Updating the License: Wizards or its designated Agents may publish updated versions of this License. You may use any authorized version of this License to copy, modify and distribute any Open Game Content originally distributed under any version of this License.",
                    _react2.default.createElement("br", null),
                    "10. Copy of this License: You MUST include a copy of this License with every copy of the Open Game Content You distribute.",
                    _react2.default.createElement("br", null),
                    "11. Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any Contributor unless You have written permission from the Contributor to do so.",
                    _react2.default.createElement("br", null),
                    "12. Inability to Comply: If it is impossible for You to comply with any of the terms of this License with respect to some or all of the Open Game Content due to statute, judicial order, or governmental regulation then You may not Use any Open Game Material so affected.",
                    _react2.default.createElement("br", null),
                    "13. Termination: This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days of becoming aware of the breach. All sublicenses shall survive the termination of this License.",
                    _react2.default.createElement("br", null),
                    "14. Reformation: If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable.",
                    _react2.default.createElement("br", null),
                    "15. COPYRIGHT NOTICE",
                    _react2.default.createElement("br", null),
                    "Open Game License v 1.0a \xA9 2000, Wizards of the Coast, Inc.",
                    _react2.default.createElement("br", null),
                    "System Reference Document \xA9 2000, Wizards of the Coast, Inc.; Authors: Jonathan Tweet, Monte Cook, and Skip Williams, based on material by E. Gary Gygax and Dave Arneson.",
                    _react2.default.createElement("br", null),
                    "Pathfinder Core Rulebook (Second Edition) \xA9 2019, Paizo Inc.; Designers: Logan Bonner, Jason Bulmahn, Stephen Radney-MacFarland, and Mark Seifter",
                    _react2.default.createElement("br", null),
                    "Daemon, Guardian from the Tome of Horrors Complete \xA9 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian McDowall.",
                    _react2.default.createElement("br", null),
                    "Dark Creeper from the Tome of Horrors Complete \xA9 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Rik Shepard.",
                    _react2.default.createElement("br", null),
                    "Dark Stalker from the Tome of Horrors Complete \xA9 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Simon Muth.",
                    _react2.default.createElement("br", null),
                    "Dragon, Faerie from the Tome of Horrors Complete \xA9 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Brian Jaeger and Gary Gygax.",
                    _react2.default.createElement("br", null),
                    "Genie, Marid from the Tome of Horrors Complete \xA9 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.",
                    _react2.default.createElement("br", null),
                    "Mite from the Tome of Horrors Complete \xA9 2011, Necromancer Games, Inc., published and distributed by Frog God Games; Author: Scott Greene, based on original material by Ian Livingstone and Mark Barnes.",
                    _react2.default.createElement("br", null),
                    "Pathfinder Bestiary (Second Edition) \xA9 2019, Paizo Inc.; Authors: Alexander Augunas, Logan Bonner, Jason Bulmahn, John Compton, Paris Crenshaw, Adam Daigle, Eleanor Ferron, Leo Glass, Thurston Hillman, James Jacobs, Jason Keeley, Lyz Liddell, Ron Lundeen, Robert G. McCreary, Tim Nightengale, Stephen Radney-MacFarland, Alex Riggs, David N. Ross, Michael Sayre, Mark Seifter, Chris S. Sims, Jeffrey Swank, Jason Tondro, Tonya Woldridge, and Linda Zayas-Palmer."
                ),
                _react2.default.createElement(
                    "h3",
                    null,
                    "MIT License"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "Copyright (c) 2019 Tim Schneider"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE."
                ),
                _react2.default.createElement(
                    "h3",
                    null,
                    "Community Use"
                ),
                _react2.default.createElement(
                    "i",
                    null,
                    "This application uses trademarks and/or copyrights owned by Paizo Inc., which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This application is not published, endorsed, or specifically approved by Paizo Inc. For more information about Paizo's Community Use Policy, please visit paizo.com/communityuse. For more information about Paizo Inc. and Paizo products, please visit paizo.com"
                )
            );
        }
    }]);

    return About;
}(_react2.default.Component);

exports.default = About;