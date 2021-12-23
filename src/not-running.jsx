import { Page } from "@patternfly/react-core";
import cockpit from "cockpit";
import React, { useState, useEffect } from "react";

const [exception, setException] = useState(undefined);

export default function NotRunning() {
    return (
        <Page>
            <PageSection>
                <Card>
                    <CardTitle>
                        Enclave Isn't Running
                    </CardTitle>
                    <CardBody>
                        <Button variant="primary" onClick={() => startEnclave()}>Start Enclave</Button>
                        <p>{!exception ? exception.message : ""}</p>
                    </CardBody>
                </Card>
            </PageSection>
        </Page>
    );
}

function startEnclave() {
    useEffect(() => {
        cockpit.spawn(["enclave", "start"])
            .catch(exception => {
                setException(exception);
            });
    }, []);
}