import React from 'react';

/**
 *🏆
 * The goal here is just to say Hello World.
 * It is similar to previous exercise we did except instead of using
 * React.createElement function we want to use JSX
 */
function HelloWorld(props){
    return (
        <div>Hello World</div>
    );
}

/**
 * 🚨 🚨 DO NOT DELETE OR CHANGE THIS.🚨 🚨
 * This is how you would use your above component and
 * the output of this code is displayed on the browser
 */
const Usage = (props) => {
    return <HelloWorld />
}

export default Usage;

