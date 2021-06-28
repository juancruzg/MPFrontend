import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from './Card';

import './SearchResults.scss';

class SearchResults extends React.Component {
    render() {
        return <React.Fragment>
            <div className="categories">
                Category1 - Category2 - Category 3
            </div>
            { ["", "", ""].map(() => {
                return <Card />;
            })}
        </React.Fragment>;
    }
};

// Since we are using class components, we need to use the HOC to access the router history.
export default withRouter(SearchResults);