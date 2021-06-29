import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from './Card';

import './SearchResults.scss';

const mockCategories = ["Category 1", "Category 2", "Category 3"];

const mock = [
    { 
        id: 1, 
        title: "Zapatillas alta yanta, neverponi ofertón", 
        price: {
            currency: "$",
            amount: "1980.25"
        }, 
        picture: "https://http2.mlstatic.com/D_NQ_NP_909149-MLA44665947846_012021-V.webp", 
        freeShipping: true
    },
    { 
        id: 1, 
        title: "Licuadora alta yanta, neverponi ofertón", 
        price: {
            currency: "$",
            amount: "222.25"
        }, 
        picture: "https://http2.mlstatic.com/D_NQ_NP_909149-MLA44665947846_012021-V.webp", 
        freeShipping: false
    },
    { 
        id: 1, 
        title: "Mochila alta yanta, neverponi ofertón", 
        price: {
            currency: "$",
            amount: "342.25"
        }, 
        picture: "https://http2.mlstatic.com/D_NQ_NP_909149-MLA44665947846_012021-V.webp", 
        freeShipping: false
    }
]

class SearchResults extends React.Component {
    handleClick = (id) => {
        const { history } = this.props;

        // Push the route to load the selected item.
        history.push({
            pathname: `/items/${id}`
        });
    }

    renderCategories(categories) {
        return categories.map((category, i) => {
            if (i !== categories.length - 1)
                return <span key={i}>{category}{" > "}</span>;
            else
                return <span className="last-category" key={i}>{ category }</span>
        });
    }

    render() {
        return <React.Fragment>
            <div className="categories">
                { this.renderCategories(mockCategories) }
            </div>
            <div className="product-list">
                { mock.map((props, i) => {
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