import React from "react";
import { Label } from "@patternfly/react-core";
import {
  TableComposable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@patternfly/react-table";


export default function PeerTable(props) {
  if (!props.status.Peers) {
    return <div></div>;
  } else {
    let tableRows = props.status.Peers.map(CreateTableRows);

    return (
      <TableComposable aria-label="Peers Table" variant="compact">
        <Thead noWrap>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Endpoint</Th>
            <Th>Ping</Th>
            <Th>Address</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableRows}
        </Tbody>
      </TableComposable>
    );
  }
}


function CreateTableRows(peer, rowIndex) {
  const isOddRow = (rowIndex + 1) % 2;
  const customStyle = {
    borderLeft: "3px solid var(--pf-global--primary-color--100)",
  };

  return (
    <Tr
      key={rowIndex}
      className={isOddRow ? "odd-row-class" : "even-row-class"}
      style={isOddRow ? customStyle : {}}
    >
      <Td>{peer.Name}</Td>
      <Td>{peer.Description}</Td>
      <Td>{formatEndPoint(peer.Tunnel)}</Td>
      <Td>{peer.Tunnel === null ? "" : formatPing(peer?.RoundTripTime)}</Td>
      <Td>{peer.Tunnel === null ? "" : peer.VirtualAddress}</Td>
    </Tr>
  );
}

function formatPing(roundTripTime){
  if (!roundTripTime || roundTripTime === -1){
    return "";
  }

  let fullNumber = roundTripTime * 100;

  return `${fullNumber.toFixed()}ms`;
}

function formatEndPoint(tunnel){
  if (!tunnel){
    return (
      <Label color="red">Down</Label>
    );
  }

  return (
    <Label color="green">{tunnel.ProtocolEndPoint}</Label>
  );
}