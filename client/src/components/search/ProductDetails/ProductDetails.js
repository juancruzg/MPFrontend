import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { GET_ITEM } from '../../../consts/URLs';
import ConditionLabel from './ConditionLabel';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import { formatMoney } from '../../../util/Format';

import './ProductDetails.scss';
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            categories: [],
            product: { price: {} }
        };
    }

    componentDidMount() {
        // From query string, build the uri to touch.
        const id = this.props.match.params.id;

        axios.get(GET_ITEM.replace(":id", id)).then((res) => {
            this.setState({ 
                product: res.data.item,
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

    render() {
        const { product: { picture, title, description, condition, soldQuantity, price: {currency, amount, decimals} },
            categories, error, loading } = this.state;

        if (loading)
            return "Loading ...";

        if (error)
            return error.toString();

        return <React.Fragment>
            <Breadcrumb items={categories} />
            <div className="product-container">
                <div className="product-left-column">
                    <div className="product-image">
                        <img width="680px" src={picture} alt="product" />
                    </div>
                    <span className="product-description">
                        <h2>Descripción del producto</h2>
                        { description }
                    </span>
                </div>
                <div className="product-right-column">
                    <div className="product-subtitle">
                        <span className="condition">
                            <ConditionLabel condition={condition} />
                        </span>
                        <span className="separator">-</span>
                        <span className="sold-quantity">{ soldQuantity } vendidos</span>
                    </div>
                    <div className="product-title">{ title }</div>
                    <div className="price-tag">
                        <span className="price-currency">{ currency }</span>
                        {" "}
                        <span className="price-amount">{ formatMoney(amount, decimals) }</span>
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