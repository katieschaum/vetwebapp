import React from "react";
import DrugCard from "./drugCard";
import { Table } from 'semantic-ui-react';

// Creates the form for drug data, calling the drug card which fills in the data.
const DrugList = (props) => {
    console.log(props);

    const renderDrugList = props.drugs.map((drug) => {    
        return (
            <DrugCard 
            drug={drug}
            clickHandler={props.deleteDrugHandler}
            editDrugHandler={props.editDrugHandler}
            key={drug.id}>
            </DrugCard>
        );
    });
    return <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell width={2}>Drug</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='left'>Method</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='left'>Concentration</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='left'>Concentration Unit</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='left'>Dosage Low</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='left'>Dosage High</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='left'>Dosage Unit</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='center'>Edit</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='right'>Remove</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {renderDrugList}
        </Table.Body>
    </Table>;
};

export default DrugList;