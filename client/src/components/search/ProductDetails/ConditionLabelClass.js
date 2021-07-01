import React from 'react';

import { NUEVO, USADO, OTRO } from '../../../consts/Condition';
 
class ConditionLabel extends React.Component {
    render() {
        const { condition } = this.props;

        if (condition === "new") {
            return NUEVO;
        } else if (condition === "used") {
            return USADO;
        } else
            return OTRO;
    }
};

export default ConditionLabel;