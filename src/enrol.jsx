import {
    Page,
    PageSection,
    Card,
    CardTitle,
    CardBody,
    Button,
    TextInput,
    Grid,
    GridItem
} from "@patternfly/react-core";
import cockpit from "cockpit";
import React from "react";
import { useNavigate, Link } from 'react-router-dom'
import { createRoute } from './routeHelper.js';


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
                        <p>{errorMessage}</p>
                        <Grid>
                            <GridItem span={1}>
                                <Button variant="primary" onClick={() => enrol(textInputValue)}>Enrol System</Button>
                            </GridItem>
                            <GridItem span={1}>
                                <Button variant="primary" component={props => <Link {...props} to={createRoute("/")} />}>Cancel</Button>
                            </GridItem>
                        </Grid>
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
            navigate(createRoute("/"))
        })
        .catch(err => {
            errorMessage = 'Error enrolling system please run "enclave enrol" in the terminal';
            console.log(err);
            navigate(createRoute("/"))
        });
}

function handleTextInputChange(value) {
    textInputValue = value;
}