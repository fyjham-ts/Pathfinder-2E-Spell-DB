import React from 'react';
import SpellList from './Spells/SpellList.js';
import BookmarkList from './Bookmarks/BookmarkList.js';
import QuickRefIndex from './QuickRef/QuickRefIndex.js';
import About from './About/About.js';
import Navigation from './Navigation.js';
import BookmarkManager from './../BookmarkManager.js';

var bookmarkMgr = new BookmarkManager();

export default class BasePage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            "activePage": "spells",
            "darkMode": false /* TODO: Store */
        };
        this.navClick = this.navClick.bind(this);
        this.darkToggle = this.darkToggle.bind(this);
    }
    darkToggle(dark) {
        this.setState({
            "darkMode": dark
        });
    }
    navClick(name, page) {
        this.setState({
            "activePage": page
        });
    }
    render() {
        var pageContent = null;
        switch (this.state.activePage) {
            case "spells": pageContent = <SpellList bookmarkManager={bookmarkMgr} />; break;
            case "bookmarks": pageContent = <BookmarkList bookmarkManager={bookmarkMgr} />; break;
            case "quickref": pageContent = <QuickRefIndex />; break;
            case "about": pageContent = <About />; break;
            default: pageContent = <div>Page To Be Created</div>; break;
        }

        return <div className={this.state.darkMode ? "dark" : "light"}>
            <Navigation onNavClick={this.navClick} darkMode={this.state.darkMode} onDarkToggle={this.darkToggle} activePage={this.state.activePage} />
            {pageContent}
        </div>;
    }
}