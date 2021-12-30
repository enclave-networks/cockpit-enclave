import cockpit from "cockpit";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
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
// import NotRunning from "./not-running.jsx";
// import Enrol from "./enrol.jsx";

const getStatus = () => cockpit.spawn(["enclave", "status", "--json"]).then(JSON.parse);

export default function Home() {
    const [status, setStatus] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        let interval = setInterval(() => {
            getStatus()
                .then(result => {
                    result.Peers = removeDiscoveryFromArray(result);
                    setStatus(result);
                })
                .catch(err => {
                    navigate("/not-running");
                });
        }, 2000);
        return () => {
            clearInterval(interval);
        }
    });



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
                    <Button variant="primary" component={props => <Link {...props} to="/enrol" />}>Enrol System</Button>
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