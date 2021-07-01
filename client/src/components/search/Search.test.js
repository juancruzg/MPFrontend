
import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from "react-router-dom";

import SearchInput from './SearchInput';

test('Search input will show proper placeholder', () => {
    // Render a checkbox with label in the document
    const search = shallow(<SearchInput  />);

    expect(search.find('input').props().placeholder).toEqual('Nunca dejes de buscar');
});