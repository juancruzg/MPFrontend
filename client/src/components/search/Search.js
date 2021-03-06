import React from 'react';
import { Route, Link, useHistory } from 'react-router-dom';

import logo from '../../assets/Logo_ML.png';
import SearchInput from './SearchInput';
import SearchResults from './searchResults';
import ProductDetails from './productDetails';

import './Search.scss';

const ITEMS_URI = "/items"

const Search = () => {
    const history = useHistory();

    const handleSearch = (text) => {
        if (text) {
            // Push the route to load the serach results.
            history.push({
                pathname: ITEMS_URI,
                search: `search=${text}`
            });
        }
    }

    return <React.Fragment>
        <header className="nav-header">
            <Link to="/" className="nav-logo">
                <div role="banner">
                    <img data-testid="img-logo" src={logo} alt="logo" />
                </div>
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