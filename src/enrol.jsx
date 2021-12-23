import { CardBody, CardTitle, Page, PageSection } from "@patternfly/react-core";
import cockpit from "cockpit";
import React from "react";

export default function Enrol({setNeedsToEnrol}) {
    let value = "";
    return (
        <Page>
            <PageSection>
                <Card>
                    <CardTitle>
                        Please Enter an Enrolment Key
                    </CardTitle>
                    <CardBody>
                        <TextInput value={value} type="text" aria-label="" />
                        <Button variant="primary" onClick={() => enrol(value, setNeedsToEnrol)}>Enrol System</Button>
                    </CardBody>
                </Card>
            </PageSection>
        </Page>
    );
}

function enrol(value, {setNeedsToEnrol}){
    cockpit
    .spawn(["sudo", "enclave", "enrol", value])
    .then(() => {
        setNeedsToEnrol(true);
    });
}