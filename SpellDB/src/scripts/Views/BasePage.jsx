import React from 'react';
import SpellList from './Spells/SpellList.jsx';
import BookmarkList from './Bookmarks/BookmarkList.jsx';
import QuickRefIndex from './QuickRef/QuickRefIndex.jsx';
import About from './About/About.jsx';
import Navigation from './Navigation.jsx';
import BookmarkManager from './../BookmarkManager.jsx';
import {ThemeContext} from './../Contexts/ThemeContext.jsx';

var bookmarkMgr = new BookmarkManager();
const darkModeKey = "SpellDB_darkMode";

export default class BasePage extends React.PureComponent {
    constructor(props) {
        super(props);
        var initialDarkMode = false;
        try {
            initialDarkMode = window.localStorage.getItem(darkModeKey) == "1";
        }
        catch (ex) {
            initialDarkMode = false;
        }
        this.state = {
            "activePage": "spells",
            "darkMode": initialDarkMode
        };
        this.navClick = this.navClick.bind(this);
        this.changeDarkMode = this.changeDarkMode.bind(this);
    }
    changeDarkMode(dark) {
        this.setState({
            "darkMode": dark
        });
        window.localStorage.setItem(darkModeKey, dark ? "1" : "0");
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
            <ThemeContext.Provider value={{ 'darkMode': this.state.darkMode, 'changeDarkMode': this.changeDarkMode}}>
                <Navigation onNavClick={this.navClick} activePage={this.state.activePage} />
                {pageContent}
            </ThemeContext.Provider>
        </div>;
    }
}