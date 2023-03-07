import React from "react";
import { Table } from "semantic-ui-react";

// Creates the table with the animals expected biometrics

const VitalsCard = (props) => {
    const { temperature_low, temperature_high, 
        heart_rate_low, heart_rate_high, 
        respiratory_rate_low, respiratory_rate_high} = "5";

    return(<Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Temp Low</Table.HeaderCell>
                <Table.HeaderCell>Temp High</Table.HeaderCell>
                <Table.HeaderCell>Heart Rate Low</Table.HeaderCell>
                <Table.HeaderCell>Heart Rate High</Table.HeaderCell>
                <Table.HeaderCell>Respiratory Rate Low</Table.HeaderCell>
                <Table.HeaderCell>Respiratory Rate High</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
        <Table.Row>
            <Table.Cell>
                <div>0</div>
            </Table.Cell>
            <Table.Cell>
                <div>0</div>
            </Table.Cell>
            <Table.Cell>
                <div>0</div>
            </Table.Cell>
            <Table.Cell>
                <div>0</div>
            </Table.Cell>
            <Table.Cell>
                <div>0</div>
            </Table.Cell>
            <Table.Cell>
                <div>0</div>
            </Table.Cell>
        </Table.Row>
        </Table.Body>
        </Table>
    );
};

export default VitalsCard