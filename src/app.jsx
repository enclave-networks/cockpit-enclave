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
  Button,
} from "@patternfly/react-core";
import PeerTable from './peer-table.jsx';
import NotRunning from "./not-running.jsx";
import Enrol from "./enrol.jsx";

const getStatus = () => cockpit.spawn(["enclave", "status", "--json"]).then(JSON.parse);

export default function Application() {
  const [status, setStatus] = useState(undefined);
  const [isRunning, setIsRunning] = useState(true);
  const [hasBeenStartedByCockpit, setHasBeenStartedByCockpit] = useState(false);
  const [shouldEnrol, setShouldEnrol] = useState(false);

  useEffect(() => {
    setInterval(() => {
      getStatus()
        .then(result => {
          result.Peers = removeDiscoveryFromArray(result);
          setStatus(result);

          // Set a 1 second timeout to avoid reloading the getStatus before the service is up
          if (hasBeenStartedByCockpit) {
            setTimeout(setHasBeenStartedByCockpit(false), 1000);
          }
        })
        .catch(err => {
          if (hasBeenStartedByCockpit) {
            return;
          }

          setIsRunning(false);
        });
    }, 2000);
  }, []);

  if (shouldEnrol) {
    return <Enrol setShouldEnrol={setShouldEnrol} />
  }

  if (!isRunning) {
    return <NotRunning setIsRunning={setIsRunning} setHasBeenStartedByCockpit={setHasBeenStartedByCockpit} />;
  }

  if (!status) {
    return <Spinner className="spinner" isSVG />;
  } else {
    let connectionCount = 0;
    status.Peers.forEach(peer => {
      if (peer.Tunnel != null) {
        connectionCount++;
      }
    });

    return (
      <Page>
        <PageSection>
          <Button variant="primary" onClick={() => { setShouldEnrol(true) }}>Enrol System</Button>
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
        <PageSection>
          <Card className="card__peers">
            <CardTitle>
              Client Peers
            </CardTitle>
            <CardBody>
              <PeerTable status={status} />
            </CardBody>
          </Card>
        </PageSection>
      </Page>
    );
  }
}

function removeDiscoveryFromArray(status) {
  return status.Peers.filter(obj => obj.Description !== "discover.enclave.io");
}