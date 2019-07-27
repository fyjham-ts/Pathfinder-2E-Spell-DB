import React from 'react';
import QuickRefTable from './QuickRefTable.js';

export default class QuickRefTables extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expanded: {}
        };
    }
    render() {
        return <div className="quickRefTables container">
            <div className="row justify-content-md-center">
                {this.props.tables.map((t, idx) => <div key={idx} className="col-md"><QuickRefTable table={t} /></div>)}
            </div>
        </div>;
    }
}