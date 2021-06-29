import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

import { GET_ITEMS } from '../../../consts/URLs';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import Card from './Card';

import './SearchResults.scss';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            items: [],
            categories: [],
            loading: true
        };
    }

    // React events
    componentDidUpdate(prevProps) {
        // If the search box is updated, trigger a new search
        if (this.props.location.search !== prevProps.location.search)
            this._findItem();
    }

    componentDidMount() {
        this._findItem();
    }

    _findItem() {
        this.setState({ loading: true });

        // From query string, build the uri to touch.
        const search = qs.parse(this.props.location.search.slice(1)).search;

        axios.get(GET_ITEMS.replace(":query", search)).then((res) => {
            this.setState({ 
                items: res.data.items,
                categories: res.data.categories, 
                loading: false
            });
        }, (error) => {
            this.setState({
                error,
                loading: false,
            });
        });
    }

    handleClick = (id) => {
        const { history } = this.props;

        // Push the route to load the selected item.
        history.push({
            pathname: `/items/${id}`
        });
    }

    render() {
        const { items, categories, loading, error } = this.state;

        if (loading)
            return "Loading...";

        if (error)
            return error.toString();

        return <React.Fragment>
            <Breadcrumb items={categories} />
            <div className="product-list">
                { items.map((props, i) => {
                    return <Card 
                        key={i} 
                        {...props} 
                        isLast={i === items.length - 1}
                        onClick={this.handleClick} />;
                })}
            </div>
        </React.Fragment>;
    }
};

// Since we are using class components, we need to use the HOC to access the router history.
export default withRouter(SearchResults);