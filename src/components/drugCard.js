import React from "react";
import { Table } from "semantic-ui-react";
import EditDrugModal from "./Modal";

// Creates the table with the drug information
const DrugCard = (props) => {
    const { id, name, method, concentration, concentrationUnit, doseLow, doseHigh, doseUnit, notes } = props.drug;
    return (
        <Table.Row>
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
                <EditDrugModal drug={props.drug} editDrug={props.editDrugHandler}/>              
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