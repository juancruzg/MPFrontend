import React from 'react';
import searchLogo from '../../assets/ic_Search.png';

class SearchInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };
    }

    handleInputChange = (e) => {
        this.setState({ text: e.target.value });
    }

    handleSubmit = (e) => {
        const { onSubmit } = this.props;

        // Execute submit from props.
        onSubmit && onSubmit(this.state.text);

        // Avoid default behaivour from form tag.
        e.preventDefault();
    }

    render() {
        const { text } = this.state;

        return <form onSubmit={this.handleSubmit} className="nav-search">
            <div className="nav-search-input">
                <input  
                    type="text" 
                    value={text}
                    onChange={this.handleInputChange}
                    placeholder="Nunca dejes de buscar" />
            </div>
            <div 
                onClick={this.handleSubmit}
                role="button" 
                tabIndex={0} 
                className="nav-search-button">
                <img src={searchLogo} alt="buscar" />
            </div>
        </form>;
    }
};

export default SearchInput;