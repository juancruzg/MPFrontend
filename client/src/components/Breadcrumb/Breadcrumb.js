import React from 'react';

import './Breadcrumb.scss';

class Breadcrumb extends React.Component {
    renderItem = (item, i) => {
        // Just for fun, adding the ability to support urls
        if (item.isUrl) {
            return <li key={i}>
                <a href={item.url}>{ item.content }</a>
            </li>
        }

        return <li key={i}>{ item }</li>
    }

    render() {
        const { items } = this.props;

        return <ul className="breadcrumb">
            { 
                items.map(this.renderItem)
            }
        </ul>;
    }
};

export default Breadcrumb;