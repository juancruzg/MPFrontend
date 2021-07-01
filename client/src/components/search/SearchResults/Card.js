import React from 'react';

import { formatMoney } from '../../../util/Format';

import shippingLogo from '../../../assets/ic_shipping.png';

const Card = ({ id, onClick, title, price: { currency, amount, decimals }, picture, freeShipping, location, isLast }) => {
    const handleProductClick = () => {
        onClick && onClick(id);
    }

    return <React.Fragment>
        <div className="product-card">
            <div className="product-picture" onClick={handleProductClick}>
                <img width="180" height="180" src={picture} alt={title || "product"}></img>
            </div>
            <div className="content">
                <div className="product-details">
                    <div className="product-title">
                        <span className="price-tag" onClick={handleProductClick}>
                            <span className="price-currency">{currency}</span>
                            {" "}
                            <span className="price-amount">{formatMoney(amount, decimals)}</span>
                            { freeShipping && 
                                <React.Fragment>
                                    {" "}
                                    <img src={shippingLogo} alt="free shipping"></img>
                                </React.Fragment>
                            }  
                        </span>
                        <h2 onClick={handleProductClick}>{ title }</h2>
                    </div>
                    <span className="product-location">
                        { location }
                    </span>
                </div>                    
            </div>
        </div>
        { !isLast && 
            <hr className="product-card-separator" />
        }
    </React.Fragment>;
};

export default Card;