import Item from './item';

describe('Item constructor', () => {
    const params = {
        id: 'ML-1',
        title: 'Un producto',
        description: 'Descripción de un producto',
        price: 2000,
        thumbnail: 'https://ml.com/imagen',
        condition: 'new',
        shipping: {
            free_shipping: true,
        },
        address: {
            city_name: 'rosario',
        },
        currency_id: 'ARs',
        sold_quantity: 5,
    };

    it('should create a new valid item', () => {
        const item = new Item(params);

        expect(item.id).toEqual(params.id);
        expect(item.title).toEqual(params.title);
        expect(item.description).toEqual(params.description);
        expect(item.price).toEqual({
            amount: params.price,
            currency: params.currency_id,
            decimals: 2,
        });
        expect(item.picture).toEqual(params.thumbnail);
        expect(item.condition).toEqual(params.condition);
        expect(item.freeShipping).toEqual(params.shipping.free_shipping);
        expect(item.location).toEqual(params.address.city_name);
        expect(item.soldQuantity).toEqual(params.sold_quantity);
    });
});
