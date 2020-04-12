import React from 'react';

function CompanyProfile(props) {
    return (
        <div>
            <div>Profile of: {props.stockTicker}</div>
            <hr />
            <div>
                {
                    Object.keys(props.companyProfileInfo)
                        .map((info, index) => {
                            return <div key={index}>{info} : {props.companyProfileInfo[info]}</div>
                        })
                }
            </div>
        </div>
    );
}

function FBCompanyProfile() {
    /**
     * We need to pass these data to the `CompanyProfile` component
     * as the props
     */
    const stockTicker = 'FB';
    const companyProfileInfo = {
        'Company Name': 'Facebook',
        'Price': 150,
        'Exchange': "Nasdaq Global Select",
        'Industry': "Computer Software",
        'CEO': 'Mark Zuckerberg'
    }
    /**
     * ✏️ need to pass the props to the `CompanyProfile` component
     * we need to pass `stockTicker` and `companyProfileInfo`
     * */
    return (
        <CompanyProfile stockTicker={stockTicker} companyProfileInfo={companyProfileInfo}/>
    )
}

/**
 * 🚨 🚨 DO NOT DELETE OR CHANGE THIS.🚨 🚨
 * This is how you would use your above component and
 * the output of this code is displayed on the browser
 */
const Usage = (props) => {
    return <FBCompanyProfile />
}

export default Usage;
