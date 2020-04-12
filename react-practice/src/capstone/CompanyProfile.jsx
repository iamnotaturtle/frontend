import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import DataAPI from '../api/DataApi';
import style from './solution/style';

const ERROR_MSG = `Error when fetching company profile data. Please check if you entered valid stock ticker`;

class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyProfile: {},
            errorMsg: ''
        }
        this.updateCompanyProfile = this.updateCompanyProfile.bind(this);
        this.updateErrorMsg = this.updateErrorMsg.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    componentDidMount() {
        this.fetchCompanyProfile(this.props.stockTicker);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.stockTicker !== this.props.stockTicker) {
            this.fetchCompanyProfile(this.props.stockTicker);
        }
    }

    fetchCompanyProfile() {
        const { stockTicker } = this.props;
        this.updateErrorMsg('');
        if (stockTicker) {
            DataAPI.getCompanyProfile(this.props.stockTicker)
                .then(this.updateCompanyProfile)
                .catch(this.handleError)
        }
    }

    updateCompanyProfile(companyProfile) {
        this.setState({companyProfile});
    }

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
        //Since there's an error we want to reset the `companyProfile` state
        //with empty object. We don't want to display stale data
        this.updateCompanyProfile({});
    }

    render() {
        const { companyProfile } = this.state;
        const { description, ...rest } = companyProfile;
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
         * Instead of checking for `errorMsg` we are checking for `companyProfile`
         * state. We are displaying the `div` only if the `companyProfile`
         * state is not empty.
         */

        const CompanyProfileSection = (
            !isEmpty(this.state.companyProfile) &&
            <div>
                <div style={style.profileDescription}>
                    {description}
                </div>
                <div style={style.profileContainer}>
                    {
                        Object.keys(rest)
                            .map(data => {
                                return (
                                    <div key={data} style={style.profileAttrContainer}>
                                        <div style={style.profileAttrTitle}>{data.toUpperCase()}</div>
                                        <div style={style.profileAttrValue}>{companyProfile[data]}</div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        )
        return (
            <div>
                {ErrorMsg}
                {CompanyProfileSection}
            </div>
        );
    }
}

export default CompanyProfile;