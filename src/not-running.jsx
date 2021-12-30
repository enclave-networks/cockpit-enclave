import { Page, PageSection, Card, CardTitle, CardBody, Button } from "@patternfly/react-core";
import cockpit from "cockpit";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'


export default function NotRunning() {
    const [exception, setException] = useState(undefined);
    const navigate = useNavigate();

    return (
        <Page>
            <PageSection>
                <Card>
                    <CardTitle>
                        Enclave Isn't Running
                    </CardTitle>
                    <CardBody>
                        <Button variant="primary" onClick={() => startEnclave(setException, navigate)}>Start Enclave</Button>
                        <p>{exception?.message ?? ""}</p>
                    </CardBody>
                </Card>
            </PageSection>
        </Page>
    );
}

function startEnclave(setException, navigate) {

    cockpit.spawn(["enclave", "start"])
        .then(() => {
            navigate("/");
        })
        .catch(exception => {
            setException(exception);
        });
}