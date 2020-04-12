import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

import DataAPI from '../api/DataApi';
import style from './solution/style';

const ERROR_MSG = `Error when fetching company financial data. Please check if you entered valid stock ticker`;

/**
 * 🏆
 * This component is responsible for displaying the financial of the stock ticker
 * provided to it as a `props` by it's parent.
 * Here we will see how to fetch data using some lifecycle methods and also potential
 * way to handle an error if it were to arise. We will conditionally render different
 * things based on some state values.
 */
class CompanyFinancial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyFinancial: {},
            errorMsg: ''
        }
        this.updateCompanyFinancial = this.updateCompanyFinancial.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    componentDidMount() {
        this.fetchCompanyFinancial(this.props.stockTicker);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.stockTicker !== this.props.stockTicker) {
            this.fetchCompanyFinancial(this.props.stockTicker);
        }
    }

    fetchCompanyFinancial() {
        const { stockTicker } = this.props;
        this.updateErrorMsg('');
        if (stockTicker) {
            DataAPI.getCompanyFinancial(this.props.stockTicker)
                .then(this.updateCompanyFinancial)
                .catch(this.handleError)
        }
    }

    /**
     * 💡
     * Updates the companyFinancial state with the argument provided
     */
    updateCompanyFinancial(companyFinancial) {
        this.setState({ companyFinancial })
    }

    /**
     * 💡
     * Updates the errorMsg state with the argument provided
     */
    updateErrorMsg(errorMsg) {
        this.setState({ errorMsg });
    }

    /**
     * 💡
     * This is used to handle any error that we might get when we call the API
     * The API throws an error when for example the stockTicker provided
     * is not a valid stockTicker.
     */
    handleError(error) {
        //This sets the state `errorMsg` with the ERROR_MSG defined at the very top
        this.updateErrorMsg(ERROR_MSG);
        //Since there's an error we want to reset the companyFincial state
        //with empty object. We don't want to display stale data
        this.updateCompanyFinancial({});
    }

    render() {
        const { companyFinancial } = this.state;
        /**
         * ✏️
         * We want to render an error message if the API returns some error.
         * We want to check if we have `errorMsg` state is not empty and
         * if it's not render the message inside a div
         * 🧭 There's an `isEmpty` function that's already imported. Use that
         *  to check if the `errorMsg` state is empty
         *      Like: isEmpty(this.state.errorMsg)
         * 🧭  If it is empty assign null to ErrorMsg
         * 🧭  If the errorMsg is not empty assign <div>{this.state.errorMsg}</div>
         *     to the ErrorMsg constant.
         * You can either use ternery operator -
         *      const a = isEmpty(b) ? c : null;
         * OR you can use '&&' operator -
         *      const a = isEmpty(b) && c;
         * Either ways you are telling ErrorMsg to display the div with the
         * error message only when the `erroMsg` state is not empty
         */
        const ErrorMsg = isEmpty(this.state.errorMsg) ? null : <div>{this.state.errorMsg}</div>;

        /**
         * 💡
         * Here we are doing same thing as the ErrorMsg above
         * Instead of checking for `errorMsg` we are checking for `companyFinancial`
         * state. We are displaying the `div` only if the `companyFinancial`
         * state is not empty.
         */
        const CompanyFinancialSection = (
            !isEmpty(this.state.companyFinancial) &&
            <div>
                <div style={style.financialTitle}>Financial</div>
                <div style={style.financialContent}>
                    {
                        Object.keys(companyFinancial)
                            .map(prop => {
                                return <div key={prop} style={style.financialMetricRow}>
                                    <div style={style.financialMetric}>
                                        {prop}
                                    </div>
                                    <div>
                                        {companyFinancial[prop]}
                                    </div>
                                </div>
                            })
                    }
                </div>

            </div>
        )
        return (
            <div style={style.financialContainer}>
                {ErrorMsg}
                {CompanyFinancialSection}
            </div>
        );
    }
}

export default CompanyFinancial;