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
            <p>There'll totally be an OGL here once I have the books in PDF form for copy-pasta.</p>
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