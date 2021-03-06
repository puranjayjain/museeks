import React, { Component } from 'react';

import Notification from './Notification.react';


/*
|--------------------------------------------------------------------------
| Notifications
|--------------------------------------------------------------------------
*/

export default class Notifications extends Component {

    constructor(props) {

        super(props);
        this.state = {}
    }

    render() {

        var notifications = this.props.notifications.map((notification, index) => <Notification type={ notification.type } content={ notification.content } key={ index } />);

        return (
            <div className='notifications'>
                { notifications }
            </div>
        );
    }
}
