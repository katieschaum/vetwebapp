import React from "react";
import DrugCard from "./drugCard";
import { Table } from 'semantic-ui-react';


const DrugList = (props) => {
    console.log(props);

    const renderDrugList = props.drugs.map((drug) => {
        return (
            <DrugCard 
            drug={drug}
            clickHandler={props.deleteDrugHandler}
            key={drug.id}>
            </DrugCard>
        );
    });
    return <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell width={1}>Animal</Table.HeaderCell>
                <Table.HeaderCell width={2}>Drug</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='left'>Method</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='left'>Concentration</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='left'>Concentration Unit</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='left'>Dosage Low</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='left'>Dosage High</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='left'>Dosage Unit</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='right'>Edit</Table.HeaderCell>
                <Table.HeaderCell width={1} textAlign='right'>Remove</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {renderDrugList}
        </Table.Body>
    </Table>;
};

export default DrugList;