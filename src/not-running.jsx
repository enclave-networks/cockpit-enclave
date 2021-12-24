import { Page, PageSection, Card, CardTitle, CardBody, Button } from "@patternfly/react-core";
import cockpit from "cockpit";
import React, { useState, useEffect } from "react";


export default function NotRunning({ setIsRunning, setHasBeenStartedByCockpit }) {
    const [exception, setException] = useState(undefined);

    return (
        <Page>
            <PageSection>
                <Card>
                    <CardTitle>
                        Enclave Isn't Running
                    </CardTitle>
                    <CardBody>
                        <Button variant="primary" onClick={() => startEnclave(setException, setIsRunning, setHasBeenStartedByCockpit)}>Start Enclave</Button>
                        <p>{exception?.message ?? ""}</p>
                    </CardBody>
                </Card>
            </PageSection>
        </Page>
    );
}

function startEnclave(setException, setIsRunning, setHasBeenStartedByCockpit) {
    cockpit.spawn(["enclave", "start"])
        .then(() => {
            setIsRunning(true);
            setHasBeenStartedByCockpit(true);
        })
        .catch(exception => {
            setException(exception);
        });
}