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
            <p>This was created to help people quickly look up info for their 2E games - if you have some fun with it that's great! I wrote a similar one for playtest, this time I ported to mobile.</p>
            <p>The full code is available on GitHub - <a target="_blank" href="https://github.com/fyjham-ts/Pathfinder-2E-Spell-DB">https://github.com/fyjham-ts/Pathfinder-2E-Spell-DB</a> - I'd love to hear your input. If you hit any bugs or want to request a feature, raise a GitHub issue!</p>
            <h2>Credits</h2>
            <p>Written by Tim Schneider.</p>
            <p>OGL & Community Use content from Paizo HEAVILY used. No claim being made here.</p>
            <h2>License Stuff</h2>
            <p>I'm a programmer not a lawyer, below comes the things I think I have to say to keep the legal people happy. Content from Paizo is licensed under OGL or Community Use as appropriate. My code is all available under MIT license.</p>
            <p>If anyone at paizo believes I've messed up let me know. I've done this all in good faith, and will take down at a simple request (Whether I've breached any license or not - I'm happy to honour any request from Paizo for how to use their content).</p>
            <h3>OGL</h3>
            <pre>There'll totally be an OGL here once I have the playtest book in PDF form for copy-pasta.</pre>
            <h3>MIT License</h3>
            <pre>Copyright (c) 2019 Tim Schneider

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</pre>
            <h3>Community Use</h3>
            <i>This application uses trademarks and/or copyrights owned by Paizo Inc., which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This application is not published, endorsed, or specifically approved by Paizo Inc. For more information about Paizo's Community Use Policy, please visit paizo.com/communityuse. For more information about Paizo Inc. and Paizo products, please visit paizo.com</i>
        </div>
    }
}