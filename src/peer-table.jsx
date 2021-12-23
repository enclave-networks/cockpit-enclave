import React from "react";
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
    var tableRows = props.status.Peers.map((peer, rowIndex) => {
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
          <Td>{peer.name}</Td>
          <Td>{peer.Description}</Td>
          <Td>{peer.Tunnel ? peer.Tunnel.ProtocolEndPoint : "Down"}</Td>
          <Td>{peer.RoundTripTime ?? ""}</Td>
          <Td>{peer.VirtualAddress ?? ""}</Td>
        </Tr>
      );
    }
    );

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