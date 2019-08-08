import React from 'react';
import ReactMarkdown from 'react-markdown';

export default class QuickRefTable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expanded: {}
        };
    }
    render() {
        return <div className="quickRefTable">
            <table className={ this.props.table.cssClass || "table" }>
                <thead>
                    {this.props.table.title && <tr>
                        <th className="title" colSpan={this.props.table.columns.length}>{this.props.table.title}</th>
                    </tr>}
                    {!this.props.table.hideHeader && <tr>
                        {this.props.table.columns.map((c, ci) => <th key={ci} className={c.colType}>{c.title}</th>)}
                    </tr>}
                </thead>
                <tbody>
                    {this.props.table.rows.map((r, ri) =>
                        <tr key={ri}>
                            {this.props.table.columns.map((c, ci) =>
                                <td key={ci} className={c.colType}>{r.length > ci && <ReactMarkdown source={String(r[ci])} />}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>;
    }
}