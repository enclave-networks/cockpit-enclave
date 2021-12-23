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
import PeerTable from './peer-table.jsx';
import NotRunning from "./not-running.jsx";
import Enrol from "./enrol.jsx";

const getStatus = () => cockpit.spawn(["enclave", "status", "--json"]).then(JSON.parse);
const getProfileCount = () => cockpit.spawn(["sudo", "ls -1", "/etc/enclave/profiles/", "| wc -l"]);

export default function Application() {
  const [status, setStatus] = useState(undefined);
  const [needsToEnrol, setNeedsToEnrol] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [hasBeenStartedByCockpit, setHasBeenStartedByCockpit] = useState(false);
  

  useEffect(() => {
    setInterval(() => {
      getStatus()
        .then(result => { 
          result.Peers = removeDiscoveryFromArray(result);
          setStatus(result);
          setHasBeenStartedByCockpit(false);
        })
        .catch(err => {
          if (hasBeenStartedByCockpit){
            return;
          }
          setIsRunning(false);
        });
    }, 2000);

    getProfileCount().then(result => {
      if (result === 0) {
        setNeedsToEnrol(true);
      }
    });
  }, []);

  if (needsToEnrol) {
    return <Enrol setNeedsToEnrol={setNeedsToEnrol} />
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