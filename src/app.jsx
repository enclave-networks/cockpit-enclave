import cockpit from "cockpit";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  Spinner,
  Page,
  PageSection,
  Flex,
  FlexItem,
  Divider,
} from "@patternfly/react-core";
import PeerTable from './peertable.jsx';



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
    return <Spinner className="pf-u-text-align-center" isSVG />;
  } else {
    status.Peers.shift();

    var connectionCount = 0;
    status.Peers.forEach(peer => {
      if (peer.Tunnel != null) {
        connectionCount++;
      }
    });

    return (
      <Page>
        <PageSection>
          <Flex className="flex__header">
            <FlexItem>
              <h1>Local Identity</h1>
              <h2>{status.Profile.Certificate.SubjectDistinguishedName}</h2>
            </FlexItem>
            <Divider isVertical />
            <FlexItem>
              <h1>Local Address</h1>
              <h2>{status.Profile.VirtualAddress}</h2>
            </FlexItem>
            <Divider isVertical />
            <FlexItem>
              <h1>Connections</h1>
              <h2>{connectionCount + " Online"}</h2>
            </FlexItem>
          </Flex>
        </PageSection>

          <Card className="card__peers">
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