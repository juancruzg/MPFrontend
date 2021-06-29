import React from 'react';
import { withRouter } from 'react-router-dom';

import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import { formatMoney } from '../../../util/Format';

import './ProductDetails.scss';

const mockCategories = ["Category 1", "Category 2", "Category 3"];

const mock = { 
    id: 1, 
    title: "Zapatillas alta yanta, neverponi ofertón", 
    price: {
        currency: "$",
        amount: 1980.25
    }, 
    condition: "Nuevo",
    soldQuantity: 3,
    picture: "https://http2.mlstatic.com/D_NQ_NP_909149-MLA44665947846_012021-V.webp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    freeShipping: true
}

class ProductDetail extends React.Component {
    render() {
        return <React.Fragment>
            <Breadcrumb items={mockCategories} />
            <div className="product-container">
                <div className="product-left-column">
                    <div className="product-image">
                        <img width="680px" src={mock.picture} alt="product" />
                    </div>
                    <span className="product-description">
                        <h2>Descripción del producto</h2>
                        { mock.description }
                    </span>
                </div>
                <div className="product-right-column">
                    <div className="product-subtitle">
                        <span className="condition">{ mock.condition }</span>
                        <span className="separator">-</span>
                        <span className="sold-quantity">{ mock.soldQuantity } vendidos</span>
                    </div>
                    <div className="product-title">{ mock.title }</div>
                    <div className="price-tag">
                        <span className="price-currency">{ mock.price.currency }</span>
                        {" "}
                        <span className="price-amount">{ formatMoney(mock.price.amount) }</span>
                    </div>
                    <div className="button">
                        <button>Comprar</button>
                    </div>
                </div>
            </div>
        </React.Fragment>;
    }
};

// Since we are using class components, we need to use the HOC to access the router history.
export default withRouter(ProductDetail);