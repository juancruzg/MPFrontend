import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';

import { GET_ITEMS } from '../../../consts/URLs';
import Breadcrumb from '../../breadcrumb/Breadcrumb';
import Card from './Card';

import './SearchResults.scss';
import { useHistory, useLocation } from 'react-router-dom';

const SearchResults = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const history = useHistory();

    // React events
    useEffect(() => {
        setLoading(true);

        // From query string, build the uri to touch.
        const search = qs.parse(location.search.slice(1)).search;

        axios.get(GET_ITEMS.replace(":query", search)).then((res) => {
            setItems(res.data.items);
            setCategories(res.data.categories);
            setLoading(false);
        }, (error) => {
            const { response: { data } } = error;

            if (error.response.status === 404) {
                // No items?
                setItems([]);
            } else if (data && data.message) {
                // Internal error?
                setError(data.message);
            } else {
                // Unkwown error?
                setError("Woops, sucedió un error.");
            } 

            setLoading(false);
        });
    }, [location]);

    const handleClick = (id) => {
        // Push the route to load the selected item.
        history.push({
            pathname: `/items/${id}`
        });
    }

    if (loading)
        return <span data-testid="loading">Loading...</span>;

    if (error)
        return <div className="error-message" data-testid="error">{ error }</div>;

    if (items.length === 0) {
        return <div className="error-message" data-testid="no-items">No se encontraron productos.</div>;
    }

    return <React.Fragment>
        <Breadcrumb items={categories} />
        <div className="product-list" data-testid="product-list">
            { items.map((props, i) => {
                return <Card 
                    key={i} 
                    {...props} 
                    isLast={i === items.length - 1}
                    onClick={handleClick} />;
            })}
        </div>
    </React.Fragment>;
};

export default SearchResults;