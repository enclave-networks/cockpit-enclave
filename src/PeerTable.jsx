import React, { Component } from "react";
import {
  TableComposable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Caption,
} from "@patternfly/react-table";

export default class PeerTable extends Component {
  constructor() {
    super();

    if (this.props.peers === null) {
      throw new Error("No peers provided");
    }
  }

  render() {
    return (
      <TableComposable aria-label="Peers Table">
        <Caption>Peers</Caption>
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
          {this.state.details.peers.map((peer, rowIndex) => {
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
                <Td>{peer.Tunnel.ProtocolEndPoint ?? "Down"}</Td>
                <Td>{peer.RoundTripTime ?? ""}</Td>
                <Td>{peer.VirtualAddress ?? ""}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </TableComposable>
    );
  }
}
