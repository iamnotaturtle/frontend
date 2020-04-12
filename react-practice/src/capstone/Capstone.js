import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

import Search from './Search';
import CompanyProfile from './CompanyProfile';
import CompanyFinancial from './CompanyFinancial';
import style from './solution/style';

const EMPTY_TICKER_MSG = 'Please type a stock ticker and click Search button.';

/**
 * 🏆
 * The goal of this capstone project is to bring together most of the
 * concepts you have learned in this tutorial together by building this feature.
 * The feature we are building is pretty straight forward. There's an input
 * field and a search button. When the user types in a valid stock ticker and
 * clicks Search button, it will display the company profile as well as
 * company financial for the given stock ticker selected.
 */
class Capstone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockTicker: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(stockTicker) {
        this.setState({stockTicker});
    }

    render() {
        const EmptyTickerMessage = isEmpty(this.state.stockTicker) ? <div>{EMPTY_TICKER_MSG}</div> : null;

        /**
         * 💡 Some things to note below inside the return:
         * 1. We are passing `handleSearch` function to `Search` component as `onSearch` props.
         *    `Search` component will execute this props when the user clicks Search button.
         *     and it will pass the current value on the input field as an argument to this function.
         *     Remeber above we we updated the state when this function is called
         * 2. We are passing `stockTicker` props to both `CompanyProfile` and
         *    `CompanyFinancial` components. These components should use the `stockTicker`
         *    props to fetch the appropriate data from the API provided and render it.
         * 3. We have a line like {EmptyTickerMessage}. It's the constant we defined above.
         *    We assigned a JSX to a constant and rendered it here inside curly braces.
         *    This is a cool thing about JSX. They can be passed around like any object or function or data.
         */
        return (
            <div style={style.container}>
                <Search onSearch={this.handleSearch} />
                <CompanyProfile stockTicker={this.state.stockTicker} />
                <CompanyFinancial stockTicker={this.state.stockTicker} />
                {EmptyTickerMessage}
            </div>
        );
    }
}

export default Capstone;