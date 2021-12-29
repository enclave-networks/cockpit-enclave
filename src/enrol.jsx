import { Page, PageSection, Card, CardTitle, CardBody, Button, TextInput } from "@patternfly/react-core";
import cockpit from "cockpit";
import React from "react";

//will display the same message if not running need to check if a profile file exists for enrol /etc/enclave/profiles
export default function Enrol({ setShouldEnrol }) {
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
                        <Button variant="primary" onClick={() => enrol(value, setShouldEnrol)}>Enrol System</Button>
                    </CardBody>
                </Card>
            </PageSection>
        </Page>
    );
}

function enrol(value, { setShouldEnrol }) {
    cockpit
        .spawn(['enclave', 'enrol', value], { superuser: "require" })
        .then(() => {
            setShouldEnrol(false);
        })
        .catch(err => {
            console.log(err);
        });
}