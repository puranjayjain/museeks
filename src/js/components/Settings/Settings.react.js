import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import SettingsLibrary  from './SettingsLibrary.react';
import SettingsUI       from './SettingsUI.react';
import SettingsAdvanced from './SettingsAdvanced.react';
import SettingsAbout    from './SettingsAbout.react';



/*
|--------------------------------------------------------------------------
| Global View
|--------------------------------------------------------------------------
*/

export default class Settings extends Component {

    constructor(props) {

        super(props);
        this.state = {};
    }

    render() {

        var config = this.props.config;

        return (
            <div className='view view-settings'>
                <Tabs defaultActiveKey={0} animation={ false } bsStyle='pills' className='settings-switcher'>
                    <Tab eventKey={0} title='Library'>
                        <SettingsLibrary config={ config } refreshingLibrary={ this.props.refreshingLibrary } refreshProgress={ this.props.refreshProgress } />
                    </Tab>
                    <Tab eventKey={1} title='Interface'>
                        <SettingsUI config={ config } />
                    </Tab>
                    <Tab eventKey={2} title='Advanced'>
                        <SettingsAdvanced config={ config } />
                    </Tab>
                    <Tab eventKey={3} title='About'>
                        <SettingsAbout />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
