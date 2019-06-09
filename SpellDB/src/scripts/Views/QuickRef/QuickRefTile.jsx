import React from 'react';

export default class QuickRefTile extends React.PureComponent {
    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this);
    }
    onSelect() {
        this.props.onSelect(this.props.QuickReference);
    }
    render() {
        return <div className="tile" onClick={this.onSelect}>
            <div className="icon">
                <i className={this.props.QuickReference.icon}></i>
            </div>
            <div className="label">
                {this.props.QuickReference.name}
            </div>
        </div>
    }
}