import React, { useState } from 'react';
import searchLogo from '../../assets/ic_Search.png';

const SearchInput = ({ onSubmit }) => {
    const [text, setText] = useState("");

    const handleInputChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        // Execute submit from props.
        onSubmit && onSubmit(text);

        // Avoid default behaivour from form tag.
        e.preventDefault();
    }

    return <form onSubmit={handleSubmit} className="nav-search">
        <div className="nav-search-input">
            <input  
                data-testid="search-box"
                type="text" 
                value={text}
                onChange={handleInputChange}
                placeholder="Nunca dejes de buscar" />
        </div>
        <div 
            onClick={handleSubmit}
            data-testid="search-box-button"
            role="button" 
            tabIndex={0} 
            className="nav-search-button">
            <img src={searchLogo} alt="buscar" />
        </div>
    </form>;
};

export default SearchInput;