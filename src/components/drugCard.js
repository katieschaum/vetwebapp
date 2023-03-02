import React from "react";
import { Table } from "semantic-ui-react";

const DrugCard = (props) => {
    const { id, animal, name, method, concentration, concentrationUnit, doseLow, doseHigh, doseUnit, notes } = props.drug;
    return (
        <Table.Row>
            <Table.Cell textAlign='center'>
            
            <div className="header">{animal}</div>
            </Table.Cell>
                <Table.Cell>
                    <div>{name}</div>
                </Table.Cell>
                <Table.Cell>
                    <div>{method}</div>
                </Table.Cell>
                <Table.Cell>
                    <div>{concentration}</div>
                </Table.Cell>
                <Table.Cell>
                    <div>{concentrationUnit}</div>
                </Table.Cell>
                <Table.Cell>
                    <div>{doseLow}</div>
                </Table.Cell>
                <Table.Cell>
                    <div>{doseHigh}</div>
                </Table.Cell>
                <Table.Cell>
                    <div>{doseUnit}</div>
                </Table.Cell>
                <Table.Cell>
                    <div> {notes} </div>
                </Table.Cell>
                <Table.Cell>
                <i 
                className="edit outline icon"
                style={{color:"blue", marginTop:"7px"}}
                onClick={() => props.clickHandler(id)}>
                </i>  
                </Table.Cell>
                <Table.Cell>
                <i 
                className="trash alternate outline icon"
                style={{color:"red", marginTop:"7px"}}
                onClick={() => props.clickHandler(id)}>
                </i>  
                </Table.Cell>
            </Table.Row>
        );
    };

   export default DrugCard