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
  return (
    <Tr key={rowIndex}>
      <Td>{peer.Name}</Td>
      <Td><b>{peer.Description}</b></Td>
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

  let ping = (Math.round(roundTripTime * 100)/100).toFixed(2);

  return `${ping}ms`;
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