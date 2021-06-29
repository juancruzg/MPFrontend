import React from 'react';

import { formatMoney } from '../../../util/Format';

import shippingLogo from '../../../assets/ic_shipping.png';
class Card extends React.Component {
    handleProductClick = () => {
        const { id, onClick } = this.props;

        onClick && onClick(id);
    }

    render() {
        const { title, price: { currency, amount, decimals }, picture, freeShipping, location, isLast } = this.props;

        return <React.Fragment>
            <div className="product-card">
                <div className="product-picture" onClick={this.handleProductClick}>
                    <img width="180" height="180" src={picture} alt={title || "product"}></img>
                </div>
                <div className="content">
                    <div className="product-details">
                        <div className="product-title">
                            <span className="price-tag" onClick={this.handleProductClick}>
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
                            <h2 onClick={this.handleProductClick}>{ title }</h2>
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
    }
};

export default Card;