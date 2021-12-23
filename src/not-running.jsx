import { Page, PageSection, Card, CardTitle, CardBody, Button } from "@patternfly/react-core";
import cockpit from "cockpit";
import React, { useState, useEffect } from "react";


export default function NotRunning({ setIsNotRunning }) {
    const [exception, setException] = useState(undefined);

    return (
        <Page>
            <PageSection>
                <Card>
                    <CardTitle>
                        Enclave Isn't Running
                    </CardTitle>
                    <CardBody>
                        <Button variant="primary" onClick={() => startEnclave(setException, setIsNotRunning)}>Start Enclave</Button>
                        <p>{exception?.message ?? ""}</p>
                    </CardBody>
                </Card>
            </PageSection>
        </Page>
    );
}

function startEnclave(setException, setIsNotRunning) {
    cockpit.spawn(["enclave", "start"])
        .then(() => {
            setIsNotRunning(false);
        })
        .catch(exception => {
            setException(exception);
        });
}