import cockpit from "cockpit";
import React, { useState, useEffect } from "react";
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
import PeerTable from './peertable.jsx'



const getStatus = () => cockpit.spawn(["enclave", "status", "--json"]).then(JSON.parse);

export default function Application() {
  const [status, setStatus] = useState(undefined);
  const [hasErrored, setHasErrored] = useState(false);


  useEffect(() => {
    setInterval(() => {
      getStatus()
        .then(result => setStatus(result))
        .catch(err => {
          console.log(err);
          setHasErrored(true);
        });
    }, 2000);
  }, []);

  if (!status) {
    return <Spinner isSVG />;
  } else {
    return (
      <Page header={Header}>
        <PageSection variant={PageSectionVariants.light}>
          Section with light background
        </PageSection>

        <Card>
          <CardTitle>
            Client Peers
          </CardTitle>
          <CardBody>
            <PeerTable status={status} />
          </CardBody>
        </Card>
      </Page>
    );
  }
}

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