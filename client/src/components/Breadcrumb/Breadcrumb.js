import React from 'react';

import './Breadcrumb.scss';

const Breadcrumb = ({ items }) => {
    const renderItem = (item, i) => {
        // Just for fun, adding the ability to support urls
        if (item.isUrl) {
            return <li key={i}>
                <a href={item.url}>{ item.content }</a>
            </li>
        }

        return <li key={i}>{ item }</li>
    }

    if (items.length === 0)
        return null;

    return <ul className="breadcrumb">
        { 
            items.map(renderItem)
        }
    </ul>;
};

export default Breadcrumb;