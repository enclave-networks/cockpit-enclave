import { Page, PageSection, Card, CardTitle, CardBody, Button, TextInput } from "@patternfly/react-core";
import cockpit from "cockpit";
import React from "react";

//will display the same message if not running need to check if a profile file exists for enrol /etc/enclave/profiles

let errorMessage = "";
let textInputValue = "";

export default function Enrol({ shouldEnrolDispatch }) {
    return (
        <Page>
            <PageSection>
                <Card>
                    <CardTitle>
                        Please Enter an Enrolment Key
                    </CardTitle>
                    <CardBody>
                        {/* <input onChange={handleTextInputChange} type="text" id="enrolmentKey" name="enrolmentKey" /> */}
                        <TextInput onChange={handleTextInputChange} type="text" aria-label="enrol text" />
                        <Button variant="primary" onClick={() => enrol(textInputValue, shouldEnrolDispatch)}>Enrol System</Button>
                        <p>{errorMessage}</p>
                    </CardBody>
                </Card>
            </PageSection>
        </Page>
    );
}

function enrol(value, shouldEnrolDispatch) {
    cockpit
        .spawn(['enclave', 'enrol', value], { superuser: "require" })
        .then(() => {
            shouldEnrolDispatch({type: 'default'});
        })
        .catch(err => {
            errorMessage = 'Error enrolling system please run "enclave enrol" in the terminal';
            shouldEnrolDispatch({type: 'default'});
            console.log(err);
        });
}

function handleTextInputChange(value){
    textInputValue = value;
}