import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ConditionLabel from './ConditionLabel';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import { GET_ITEM } from '../../../consts/URLs';
import { formatMoney } from '../../../util/Format';

import './ProductDetails.scss';

const ProductDetail = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({ price: {} });
    const [error, setError] = useState(null);

    const params = useParams();

    useEffect(() => {
        // From query string, build the uri to touch.
        const { id } = params;

        axios.get(GET_ITEM.replace(":id", id)).then((res) => {
            setLoading(false);
            setProduct(res.data.item);
            setCategories(res.data.categories);
        }, (error) => {
            setError(error);
            setLoading(false);
        });
    }, [params]);

    const { picture, title, description, condition, soldQuantity, price: {currency, amount, decimals} } = product;

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
};

export default ProductDetail;