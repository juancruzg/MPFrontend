import React from 'react';

class Card extends React.Component {
    render() {
        const { id, title, price, picture, freeShipping } = this.props;

        return <div className="product-card">
            <img src={picture} alt={title || "product"}></img>
            <div className="content">
                <span className="price-tag">
                    <span className="price-currency">$</span>
                    <span className="price-amount">200</span>    
                </span>
                <h2 className="product-title">
                     Zapatillas
                </h2>
                <span className="product-location">
                    Rosario
                </span>
            </div>
        </div>;
    }
};

export default Card;