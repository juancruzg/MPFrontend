class Item {
    constructor({
        id, title, description, price, thumbnail, condition,
        // eslint-disable-next-line camelcase
        shipping: { free_shipping }, address, currency_id, sold_quantity
    }) {
        this.id = id;
        this.title = title;
        this.price = {
            currency: currency_id,
            amount: price,
            decimals: 2,
        };
        this.picture = thumbnail;
        this.condition = condition;
        // eslint-disable-next-line camelcase
        this.freeShipping = free_shipping;
        if (address) {
            // eslint-disable-next-line camelcase
            this.location = address.city_name;
        }

        // eslint-disable-next-line camelcase
        this.soldQuantity = sold_quantity;
        this.description = description;
    }
}

export default Item;
