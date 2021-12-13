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

import cockpit from "cockpit";
import React from "react";
import {
  Alert,
  Card,
  CardTitle,
  CardBody,
  Brand,
  Spinner,
  Page,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  PageSection,
  PageSectionVariants,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import PeerTable from "./PeerTable.jsx";

export class Application extends React.Component {
  constructor() {
    super();
    cockpit
      .spawn(["enclave", "status", "--json"])
      .then((result) => {
        var statusDetails = JSON.parse(result);
        this.setState({ details: statusDetails });
      })
      .catch(fail);
    // cockpit.file('/etc/hostname').watch(content => {
    //     this.setState({ hostname: content.trim() });
    // });
  }

  DisplayContent() {
    if (details == null) {
      return <Spinner isSVG />;
    } else {
      const Header = (
        <Masthead display={{ default: "stack" }} inset={{ default: "insetXs" }}>
          <MastheadMain>
            <MastheadBrand
              href="https://patternfly.org"
              onClick={() => console.log("clicked logo")}
              target="_blank"
            >
              Logo
            </MastheadBrand>
          </MastheadMain>
        </Masthead>
      );

      return (
        <Page header={Header}>
          <PageSection variant={PageSectionVariants.light}>
            Section with light background
          </PageSection>

          <Brand src={pfLogo} alt="Patternfly Logo" />

          <Card>
            <CardTitle>
                Client Peers
            </CardTitle>
            <CardBody>
            <PeerTable details={this.state.details} />
            </CardBody>
          </Card>


        </Page>
      );
    }
  }

  render() {
    return this.DisplayContent();
  }
}
