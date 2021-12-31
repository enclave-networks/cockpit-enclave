import { Page, PageSection, Card, CardTitle, CardBody, Button, TextInput } from "@patternfly/react-core";
import cockpit from "cockpit";
import React from "react";
import { useNavigate } from 'react-router-dom'

//will display the same message if not running need to check if a profile file exists for enrol /etc/enclave/profiles

let errorMessage = "";
let textInputValue = "";

export default function Enrol() {
    return (
        <Page>
            <PageSection>
                <Card>
                    <CardTitle>
                        Please Enter an Enrolment Key
                    </CardTitle>
                    <CardBody>
                        <TextInput onChange={handleTextInputChange} type="text" aria-label="enrol text" />
                        <Button variant="primary" onClick={() => enrol(textInputValue)}>Enrol System</Button>
                        <p>{errorMessage}</p>
                    </CardBody>
                </Card>
            </PageSection>
        </Page>
    );
}

function enrol(value) {
    const navigate = useNavigate();
    cockpit
        .spawn(['enclave', 'enrol', value], { superuser: "require" })
        .then(() => {
            navigate("/")
        })
        .catch(err => {
            errorMessage = 'Error enrolling system please run "enclave enrol" in the terminal';
            console.log(err);
            navigate("/");
        });
}

function handleTextInputChange(value) {
    textInputValue = value;
}