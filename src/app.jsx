import { spawn } from "./cockpit";
import React, {useEffect, useState} from "react";
import {
  Card,
  CardTitle,
  CardBody,
  Brand,
  Spinner,
  Page,
  Masthead,
  MastheadMain,
  MastheadBrand,
  PageSection,
  PageSectionVariants,
} from "@patternfly/react-core";
import PeerTable from './peertable.jsx'

const getStatus = () => spawn().then(JSON.parse);

const Header = () => (
  <Masthead display={{ default: "stack" }} inset={{ default: "insetXs" }}>
    <MastheadMain>
      <MastheadBrand
        href="https://patternfly.org"
        onClick={() => console.log("clicked logo")}
        target="_blank"
      >
        Logo
      </MastheadBrand>
    </MastheadMain>
  </Masthead>
);

const App = () => {
  const [status, setStatus] = useState(undefined);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getStatus()
        .then(setStatus)
        .catch(err => {
          console.log(err);
          setHasErrored(true);
          clearInterval(intervalId);
        });
    }, 500);
    return () => clearInterval(intervalId);
  }, [setStatus, setHasErrored]);

  if (hasErrored) {
    return <>error</>;
  }

  if (!status) {
    return <Spinner isSVG />;
  }



  return (
    <Page header={Header}>
      <PageSection variant={PageSectionVariants.light}>
        Section with light background
      </PageSection>

      {/* <Brand src={pfLogo} alt="Patternfly Logo" /> */}

      <Card>
        <CardTitle>
          Client Peers
        </CardTitle>
        <CardBody>
          <PeerTable details={status.details} />
        </CardBody>
      </Card>


    </Page>
  );
};

export default App;


// export default class Application extends React.Component {
//   constructor() {
//     super();
//
//     this.state = {
//     };
//
//     setInterval(function() {
//       this.getStatus();
//     }, 2000).bind(this);
//   }
//
//   getStatus() {
//     // cockpit
//     // .spawn(["enclave", "status", "--json"])
//     // .then(data => {
//     //   var statusDetails = JSON.parse(data);
//     //   this.setState({ details: statusDetails });
//     // })
//     // .catch(exception => {
//     //   console.log(exception);
//     // }).bind(this);
//   }
//
//   render() {
//     if (this.state.details == null) {
//       return <Spinner isSVG />;
//     } else {
//       const Header = (
//         <Masthead display={{ default: "stack" }} inset={{ default: "insetXs" }}>
//           <MastheadMain>
//             <MastheadBrand
//               href="https://patternfly.org"
//               onClick={() => console.log("clicked logo")}
//               target="_blank"
//             >
//               Logo
//             </MastheadBrand>
//           </MastheadMain>
//         </Masthead>
//       );
//
//       return (
//         <Page header={Header}>
//           <PageSection variant={PageSectionVariants.light}>
//             Section with light background
//           </PageSection>
//
//           {/* <Brand src={pfLogo} alt="Patternfly Logo" /> */}
//
//           <Card>
//             <CardTitle>
//               Client Peers
//             </CardTitle>
//             <CardBody>
//               <PeerTable details={this.state.details} />
//             </CardBody>
//           </Card>
//
//
//         </Page>
//       );
//     }
//   }
// }
