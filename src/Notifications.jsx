import React from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';

function Notifications({notification = ''}) {

    const klass = `py-3 mx-auto row-alerts ${notification ? 'show' : 'hide'}`;

    return (
       <div className={'row alerts-wrapper'}>
           <div className={klass}>
               {notification}
           </div>
       </div>
    );
}

Notifications.propTypes = {};
Notifications.defaultProps = {};

export default Notifications;
