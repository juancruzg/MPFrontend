import React from 'react';
import { Route, Link, useHistory } from 'react-router-dom';

import logo from '../../assets/Logo_ML.png';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults/SearchResults';
import ProductDetails from './ProductDetails/ProductDetails';

import './Search.scss';

const ITEMS_URI = "/items"

const Search = () => {
    const history = useHistory();

    const handleSearch = (text) => {
        // Push the route to load the serach results.
        history.push({
            pathname: ITEMS_URI,
            search: `search=${text}`
        });
    }

    return <React.Fragment>
        <header className="nav-header">
            <Link to="/" className="nav-logo">
                <img src={logo} alt="logo" />
            </Link>
            <SearchInput onSubmit={handleSearch} />
        </header>

        <div className="search-container">
            <Route path={ITEMS_URI} exact>
                <SearchResults />
            </Route>
            <Route path={`${ITEMS_URI}/:id`} exact>
                <ProductDetails />
            </Route>
        </div>
    </React.Fragment>;
};

export default Search;