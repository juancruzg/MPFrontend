/* eslint-disable camelcase */
class Item {
    constructor({
        id, title, description, price, thumbnail, condition,
        shipping: { free_shipping }, address, currency_id, sold_quantity,
    }) {
        this.id = id;
        this.title = title;
        this.picture = thumbnail;
        this.condition = condition;
        this.freeShipping = free_shipping;
        this.soldQuantity = sold_quantity;
        this.description = description;
        this.price = {
            currency: currency_id,
            amount: price,
            decimals: 2,
        };

        // In case we are using this as a search item, we set the location.
        if (address) {
            this.location = address.city_name;
        }
    }
}

export default Item;
