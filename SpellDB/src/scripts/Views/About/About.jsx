import React from 'react';



export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "oglExpanded": false
        }
    }
    render() {
        return <div className="about">
            <h2>About</h2>
            <p>This was created to help people quickly look up info for their 2E games - if you have some fun with it that's great! I wrote a similar one for playtest for my local group. This time I ported to web and mobile & figured I'd let others know about it.</p>
            <p>The full code is available on GitHub - <a target="_blank" href="https://github.com/fyjham-ts/Pathfinder-2E-Spell-DB">https://github.com/fyjham-ts/Pathfinder-2E-Spell-DB</a> - I'd love to hear your input. If you hit any bugs or want to request a feature, raise a GitHub issue!</p>
            <p>I'm a big fan of Paizo and I respect their hard work making my favourite hobby more fun. I've done this all in good faith, and will take down at a simple request from anyone from Paizo (Whether I've breached any license or not - if this bothers them I don't want to do it).</p>
            <h2>Credits</h2>
            <p>Code written by Tim Schneider</p>
            <p>OGL & Community Use content from Paizo HEAVILY used.</p>
            <p>Data gathered as a mix of scraping from <a href="https://www.aonprd.com">Archives of Nethys</a> and mind-numbing data entry. I wouldn't have been able to do this if I had to enter it all from scratch. They did the hard legwork.</p>
            <p>For tech dependencies check out the GitHub.</p>
            <h2>License Stuff</h2>
            <p>I'm a programmer not a lawyer, below comes the things I think I have to say to keep the legal people happy. Content from Paizo is licensed under OGL or Community Use as appropriate. My code is all available under MIT license.</p>
            <h3>OGL</h3>
            <p>The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc. (“Wizards”). All Rights Reserved.<br/>
1. Definitions: (a) “Contributors” means the copyright and/or trademark owners who have contributed Open
Game Content; (b) “Derivative Material” means copyrighted material including derivative works and translations
(including into other computer languages), potation, modification, correction, addition, extension, upgrade,
improvement, compilation, abridgment or other form in which an existing work may be recast, transformed or
adapted; (c) “Distribute” means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or
otherwise distribute; (d) “Open Game Content” means the game mechanic and includes the methods, procedures,
processes and routines to the extent such content does not embody the Product Identity and is an enhancement
over the prior art and any additional content clearly identified as Open Game Content by the Contributor, and
means any work covered by this License, including translations and derivative works under copyright law, but
specifically excludes Product Identity. (e) “Product Identity” means product and product line names, logos and
identifying marks including trade dress; artifacts, creatures, characters, stories, storylines, plots, thematic elements,
dialogue, incidents, language, artwork, symbols, designs, depictions, likenesses, formats, poses, concepts, themes
and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells,
enchantments, personalities, teams, personas, likenesses and special abilities; places, locations, environments,
creatures, equipment, magical or supernatural abilities or effects, logos, symbols, or graphic designs; and any
other trademark or registered trademark clearly identified as Product identity by the owner of the Product
Identity, and which specifically excludes the Open Game Content; (f) “Trademark” means the logos, names, mark,
sign, motto, designs that are used by a Contributor to identify itself or its products or the associated products
contributed to the Open Game License by the Contributor (g) “Use”, “Used” or “Using” means to use, Distribute,
copy, edit, format, modify, translate and otherwise create Derivative Material of Open Game Content. (h) “You”
or “Your” means the licensee in terms of this agreement.<br />
2. The License: This License applies to any Open Game Content that contains a notice indicating that the Open
Game Content may only be Used under and in terms of this License. You must affix such a notice to any Open
Game Content that you Use. No terms may be added to or subtracted from this License except as described by the
License itself. No other terms or conditions may be applied to any Open Game Content distributed using this License.<br />
3. Offer and Acceptance: By Using the Open Game Content You indicate Your acceptance of the terms of this License.<br />
4. Grant and Consideration: In consideration for agreeing to use this License, the Contributors grant You a perpetual,
worldwide, royalty-free, non-exclusive license with the exact terms of this License to Use, the Open Game Content.<br />
5. Representation of Authority to Contribute: If You are contributing original material as Open Game Content,
You represent that Your Contributions are Your original creation and/or You have sufficient rights to grant the
rights conveyed by this License.<br />
6. Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include
the exact text of the COPYRIGHT NOTICE of any Open Game Content You are copying, modifying or distributing,
and You must add the title, the copyright date, and the copyright holder’s name to the COPYRIGHT NOTICE of
any original Open Game Content you Distribute.<br />
7. Use of Product Identity: You agree not to Use any Product Identity, including as an indication as to compatibility,
except as expressly licensed in another, independent Agreement with the owner of each element of that Product
Identity. You agree not to indicate compatibility or co-adaptability with any Trademark or Registered Trademark
in conjunction with a work containing Open Game Content except as expressly licensed in another, independent
Agreement with the owner of such Trademark or Registered Trademark. The use of any Product Identity in Open
Game Content does not constitute a challenge to the ownership of that Product Identity. The owner of any Product
Identity used in Open Game Content shall retain all rights, title and interest in and to that Product Identity.<br />
8. Identification: If you distribute Open Game Content You must clearly indicate which portions of the work
that you are distributing are Open Game Content.<br />
9. Updating the License: Wizards or its designated Agents may publish updated versions of this License. You
may use any authorized version of this License to copy, modify and distribute any Open Game Content originally
distributed under any version of this License.<br />
10. Copy of this License: You MUST include a copy of this License with every copy of the Open Game Content
You distribute.<br />
11. Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any
Contributor unless You have written permission from the Contributor to do so.<br />
12. Inability to Comply: If it is impossible for You to comply with any of the terms of this License with respect
to some or all of the Open Game Content due to statute, judicial order, or governmental regulation then You may
not Use any Open Game Material so affected.<br />
13. Termination: This License will terminate automatically if You fail to comply with all terms herein and
fail to cure such breach within 30 days of becoming aware of the breach. All sublicenses shall survive the
termination of this License.<br />
14. Reformation: If any provision of this License is held to be unenforceable, such provision shall be reformed
only to the extent necessary to make it enforceable.<br />
15. COPYRIGHT NOTICE<br />
Open Game License v 1.0a © 2000, Wizards of the Coast, Inc.<br />
System Reference Document © 2000, Wizards of the Coast, Inc.; Authors: Jonathan Tweet, Monte Cook, and
Skip Williams, based on material by E. Gary Gygax and Dave Arneson.<br />
Pathfinder Core Rulebook (Second Edition) © 2019, Paizo Inc.; Designers: Logan Bonner, Jason Bulmahn,
Stephen Radney-MacFarland, and Mark Seifter<br />
Daemon, Guardian from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and
distributed by Frog God Games; Author: Scott Greene, based on original material by Ian McDowall.<br />
Dark Creeper from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed
by Frog God Games; Author: Scott Greene, based on original material by Rik Shepard.<br />
Dark Stalker from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed
by Frog God Games; Author: Scott Greene, based on original material by Simon Muth.<br />
Dragon, Faerie from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed
by Frog God Games; Author: Scott Greene, based on original material by Brian Jaeger and Gary Gygax.<br />
Genie, Marid from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed
by Frog God Games; Author: Scott Greene, based on original material by Gary Gygax.<br />
Mite from the Tome of Horrors Complete © 2011, Necromancer Games, Inc., published and distributed by Frog
God Games; Author: Scott Greene, based on original material by Ian Livingstone and Mark Barnes.<br />
Pathfinder Bestiary (Second Edition) © 2019, Paizo Inc.; Authors: Alexander Augunas, Logan Bonner, Jason Bulmahn,
John Compton, Paris Crenshaw, Adam Daigle, Eleanor Ferron, Leo Glass, Thurston Hillman, James Jacobs, Jason Keeley,
Lyz Liddell, Ron Lundeen, Robert G. McCreary, Tim Nightengale, Stephen Radney-MacFarland, Alex Riggs, David N.
Ross, Michael Sayre, Mark Seifter, Chris S. Sims, Jeffrey Swank, Jason Tondro, Tonya Woldridge, and Linda Zayas-Palmer.</p>
            <h3>MIT License</h3>
            <p>Copyright (c) 2019 Tim Schneider</p>
            <p>Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:</p>
            <p>The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.</p>
            <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.</p>
            <h3>Community Use</h3>
            <i>This application uses trademarks and/or copyrights owned by Paizo Inc., which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This application is not published, endorsed, or specifically approved by Paizo Inc. For more information about Paizo's Community Use Policy, please visit paizo.com/communityuse. For more information about Paizo Inc. and Paizo products, please visit paizo.com</i>
        </div>
    }
}