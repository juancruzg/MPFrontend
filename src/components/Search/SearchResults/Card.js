import React from 'react';

class Card extends React.Component {
    render() {
        const { id, title, price, picture, freeShipping } = this.props;

        return <div className="product-card">
            <div className="product-picture">
                <img width="180" height="180" src={"https://http2.mlstatic.com/D_NQ_NP_909149-MLA44665947846_012021-V.webp"} alt={title || "product"}></img>
            </div>
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