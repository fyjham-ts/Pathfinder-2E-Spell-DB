import React from 'react';

export default class BookmarkListSummary extends React.PureComponent {
    // type
    // cast
    // prep
    // allowReset
    // allowPrep
    // allowCast
    constructor(props) {
        super(props);
    }
    render() {
        switch ((this.props.type || '').toLowerCase()) {
            case 'cantrip':
                return <span className="vancian cantrip">
                    <span className="action">
                        {!!this.props.prep && <i className="fas fa-magic" onClick={this.props.onRemoveVancianPrep} />}
                        {!this.props.prep && <i className="fas fa-ban" onClick={this.props.onAddVancianPrep} />}
                    </span>
                </span>;
            case 'focus':
                return null;
            default:
                return <span className="vancian">
                    {this.props.cast > 0 && this.props.allowReset && <span className="action">
                        <i className="fas fa-undo" onClick={this.props.onResetCastVancian} />
                    </span>}
                    {(this.props.cast < this.props.prep) && this.props.allowCast && <span className="action">
                        <i className="fas fa-magic" onClick={this.props.onCastVancian} />
                    </span>}
                    {(this.props.cast >= this.props.prep) && this.props.allowCast && <span className="action">
                        <i className="fas fa-ban" />
                    </span>}
                    <span className="item">{this.props.prep - this.props.cast}</span>
                    <span className="item">/</span>
                    <span className="item">{this.props.prep}</span>
                    {this.props.prep > 0 && this.props.allowPrep && <span className="action">
                        <i className="fas fa-minus-square" onClick={this.props.onRemoveVancianPrep} />
                    </span>}
                    {this.props.allowPrep && <span className="action">
                        <i className="fas fa-plus-square" onClick={this.props.onAddVancianPrep} />
                    </span>}
                </span>;
        }
    }
}