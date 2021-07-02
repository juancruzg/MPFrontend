import ConditionLabel from "./ConditionLabel";

describe('Conditional Label', () => {
    it ('should create a NUEVO label', () => {
        expect(ConditionLabel({ condition: 'new' })).toEqual('Nuevo');
    });

    it ('should create a USADO label', () => {
        expect(ConditionLabel({ condition: 'used' })).toEqual('Usado');
    });

    it ('should create a OTRO label', () => {
        expect(ConditionLabel({ condition: 'other' })).toEqual('Otro');
    });
});
