import React from 'react';
import QuickRefList from './QuickRefList.js';
import QuickRefTile from './QuickRefTile.js';
import { loadRefData } from '../../RefLoader.js';
var references = loadRefData();

export default class QuickRefIndex extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            "activeRef": null
        };
        this.backToListing = this.backToListing.bind(this);
        this.setActiveRef = this.setActiveRef.bind(this);
    }
    backToListing() {
        this.setActiveRef(null);
    }
    setActiveRef(ref) {
        this.setState({ "activeRef": ref });
    }
    render() {
        if (this.state.activeRef == null) {
            return <div className="quickRefGrid">
                {references.map(r => <QuickRefTile key={r.name} QuickReference={r} onSelect={this.setActiveRef} />)}
            </div>
        }
        else {
            var listContent = null;
            switch (this.state.activeRef.render) {
                case "list":
                default:
                    listContent = <QuickRefList list={this.state.activeRef.list} />
                    break;
            }
            return <div className="quickRefContent">
                <h2>
                    <i className={this.state.activeRef.icon}></i> {this.state.activeRef.name}
                </h2>
                <a className="back" onClick={this.backToListing}><i className="fa fa-chevron-left"></i> Back to listing</a>
                <div>
                    {this.state.activeRef.description && <p class="quickRefDescription">
                        {this.state.activeRef.description}
                    </p>}
                    {listContent}
                </div>
            </div>;
        }
    }
}