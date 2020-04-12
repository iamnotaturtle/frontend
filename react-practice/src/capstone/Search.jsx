import React, { Component } from 'react';
import style from './solution/style';

/**
 * 🏆
 * This component houses the input and the Search button.
 * When the user types in something we handle the change event and
 * store the values typed in the input field to the state
 * When user clicks the Search button it will invoke a callback function
 * that was passed to this component as a props with the latest input value
 * as an argument
 */
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockTicker: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            stockTicker: e.target.value,
        });
    }

    handleSearch() {
        this.props.onSearch(this.state.stockTicker);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    }

    render() {
        const { stockTicker } = this.state;
        return (
            <div style={style.searchContainer}>
                <input style={style.searchInput} onKeyPress={this.handleKeyPress} onChange={this.handleInputChange} value={stockTicker} placeholder={'Select a stock'} />
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default Search;
