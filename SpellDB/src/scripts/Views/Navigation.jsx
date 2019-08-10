import React from 'react';
import { ThemeContext } from './../Contexts/ThemeContext.jsx';

const links = [
    { "name": "Spells", "page": "spells" },
    { "name": "Bookmark Manager", "page": "bookmarks" },
    { "name": "Quick References", "page": "quickref" },
    { "name": "Dark Mode", "navType": "DarkMode" },
    { "name": "About", "page": "about"}
];
class DarkModeItem extends React.PureComponent {
    render() {
        return <li className="nav-item">
            <ThemeContext.Consumer>
                {theme => <label className="nav-link">
                        <span className="switch">
                            <input type="checkbox" onChange={(e) => theme.changeDarkMode(e.target.checked)} checked={theme.darkMode} />
                            <span className="slider" />
                        </span>
                        {this.props.name}
                    </label>
                }
            </ThemeContext.Consumer>
        </li>;
    }
}
class NavItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.props.onClick(this.props.name, this.props.page);
    }
    render() {
        return <li className={"nav-item" + (this.props.active ? " active" : "")}>
            <a onClick={this.onClick} href="#" className="nav-link">{this.props.name}</a>
        </li>;
    }
}

export default class Navigation extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            toggled: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.navClick = this.navClick.bind(this);
    }
    toggleNav() {
        this.setState({
            toggled: !this.state.toggled
        });
    }
    navClick(name, page) {
        this.props.onNavClick(name, page);
        this.setState({
            toggled: false
        })
    }
    render() {
        var navAreaClass = "collapse navbar-collapse" + (this.state.toggled ? " show": "");

        return <ThemeContext.Consumer>
            {theme => <nav className={"navbar navbar-expand-md " + (theme.darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light")}>
                <a className="navbar-brand" href="#">Spell DB</a>

                <button onClick={this.toggleNav} className="navbar-toggler" type="button" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={navAreaClass}>
                    <ul className="navbar-nav mr-auto">
                        {links.map(l => {
                            switch (l.navType) {
                                case "DarkMode": return <DarkModeItem key={l.name} name={l.name} />; break;
                                default: return <NavItem key={l.name} name={l.name} page={l.page} active={l.page == this.props.activePage} onClick={this.navClick} />; break;
                            }
                        })}
                    </ul>
                </div>
            </nav>}
        </ThemeContext.Consumer>;
    }
}