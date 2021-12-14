import cockpit from "cockpit";
import React from "react";
import {
  Card,
  CardTitle,
  CardBody,
  Brand,
  Spinner,
  Page,
  Masthead,
  MastheadMain,
  MastheadBrand,
  PageSection,
  PageSectionVariants,
} from "@patternfly/react-core";
import PeerTable from './PeerTable.jsx'

export default class Application extends React.Component {
  constructor() {
    super();

    this.state = {
    };

    cockpit
    .spawn(["enclave", "status", "--json"])
    .then(data => {
      var statusDetails = JSON.parse(data);
      this.setState({ details: statusDetails });
    })
    .catch(exception => {
      console.log(exception);
    }).bind(this);
  }

  render() {
    if (this.state.details == null) {
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

          {/* <Brand src={pfLogo} alt="Patternfly Logo" /> */}

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
}
