import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import Card from './Card';

import './SearchResults.scss';

const mockCategories = ["Category 1", "Category 2", "Category 3"];

const mock = [
    { 
        id: 1, 
        title: "Zapatillas alta yanta, neverponi ofertón", 
        price: {
            currency: "$",
            amount: 1980.25,
            decimals: 2
        }, 
        picture: "https://http2.mlstatic.com/D_NQ_NP_909149-MLA44665947846_012021-V.webp", 
        freeShipping: true
    },
    { 
        id: 1, 
        title: "Licuadora alta yanta, neverponi ofertón", 
        price: {
            currency: "$",
            amount: 22222.25,
            decimals: 1
        }, 
        picture: "https://http2.mlstatic.com/D_NQ_NP_909149-MLA44665947846_012021-V.webp", 
        freeShipping: false
    },
    { 
        id: 1, 
        title: "Mochila alta yanta, neverponi ofertón", 
        price: {
            currency: "$",
            amount: 342222.25,
            decimals: 2
        }, 
        picture: "https://http2.mlstatic.com/D_NQ_NP_909149-MLA44665947846_012021-V.webp", 
        freeShipping: false
    }
]

const url = "http://localhost:3001/api/items?q=:query";

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            items: [],
            loading: true
        };
    }

    componentDidMount() {
        // From query string, build the uri to touch.
        const search = qs.parse(this.props.location.search.slice(1)).search;

        axios.get(url.replace(":query", search)).then((res) => {
            this.setState({ 
                items: mock, 
                loading: false
            });
        }, (error) => {
            this.setState({
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
        const { items, loading } = this.state;

        if (loading)
            return "Loading...";

        return <React.Fragment>
            <Breadcrumb items={mockCategories} />
            <div className="product-list">
                { items.map((props, i) => {
                    return <Card 
                        key={i} 
                        {...props} 
                        isLast={i === mock.length - 1}
                        onClick={this.handleClick} />;
                })}
            </div>
        </React.Fragment>;
    }
};

// Since we are using class components, we need to use the HOC to access the router history.
export default withRouter(SearchResults);