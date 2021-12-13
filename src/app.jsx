/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

import cockpit from 'cockpit';
import React from 'react';
import { Alert, Card, CardTitle, CardBody, Brand, Spinner } from '@patternfly/react-core';
import PeerTable from './PeerTable';

let details = {};

export class Application extends React.Component {
    constructor() {
        super();
        this.setState({details: {
            peers: []
        }}); 
        // cockpit.file('/etc/hostname').watch(content => {
        //     this.setState({ hostname: content.trim() });
        // });
    }

    DisplayContent() {
        if (details == null) {
            return <Spinner isSVG />
        }
        else {
            return (
                <div>
                    <Brand src={pfLogo} alt="Patternfly Logo" />

                    <Card>
                        <CardTitle>Starter Kit</CardTitle>
                        <CardBody>

                        </CardBody>
                    </Card>

                    <PeerTable peers={this.state.peers} />
                </div>                
            )
        }
    }

    render() {
        return this.DisplayContent();
    }
}
