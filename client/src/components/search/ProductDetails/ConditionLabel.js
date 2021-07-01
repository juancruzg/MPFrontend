import { NUEVO, USADO, OTRO } from '../../../consts/Condition';

const ConditionLabel = ({ condition }) => {
    if (condition === "new") {
        return NUEVO;
    } else if (condition === "used") {
        return USADO;
    } else
        return OTRO;
};

export default ConditionLabel;