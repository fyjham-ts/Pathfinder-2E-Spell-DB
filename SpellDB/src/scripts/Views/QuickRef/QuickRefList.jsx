import React from 'react';
import ReactMarkdown from 'react-markdown';

export default class QuickRefList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expanded: {}
        };
        this.toggleExpand = this.toggleExpand.bind(this);
    }
    toggleExpand(name) {
        var expanded = Object.assign({}, this.state.expanded);
        expanded[name] = !expanded[name];
        this.setState({ expanded: expanded });
    }
    render() {
        return <div className="quickRefList accordion">
            {this.props.list.map((c) => <div key={c.name} className="card">
                <div className="card-header" onClick={() => this.toggleExpand(c.name)}>
                    {c.icon && <span className={c.icon}>{c.iconText}</span>}
                    {c.name}
                </div>
                {this.state.expanded[c.name] &&
                    <div className="card-body">
                        <ReactMarkdown source={c.description} />
                    </div>
                }
            </div>)}
        </div>;
    }
}