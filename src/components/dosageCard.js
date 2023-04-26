import React from "react";
import { Table, TableCell } from "semantic-ui-react";
import EditDosageModal from "./Modal";

// Creates the table with the dosage information
const DosageCard = (props) => { 
    const { id, drugName, method, concentration, dose, notes } = props.dosage.deref;
    return (
        <Table.Row>
                <Table.Cell>
                    <div>{drugName}</div>
                </Table.Cell>
                <Table.Cell>
                    <div>{method}</div>
                </Table.Cell>
                <Table.Cell>
                    <div>{concentration}</div>
                </Table.Cell>
                <Table.Cell>
                    <div>{dose}</div>
                </Table.Cell>
                <Table.Cell>
                    <div> {notes} </div>
                </Table.Cell>
                <TableCell>
                    <EditDosageModal style={{color:"blue", align:"center"}} key={id} dosage={props.dosage} editDrug={props.editDosageHandler}/>              
                </TableCell>
                <Table.Cell>
                <i 
                className="trash alternate outline icon"
                style={{color:"red", marginTop:"7px"}}
                onClick={() => props.clickHandler(id)}>
                </i>  
                </Table.Cell>
            </Table.Row>
            
        );
        <br/>
    };

export default DosageCard
