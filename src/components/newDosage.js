import { React, useState, useEffect } from "react";
import { Component } from "react";
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Grid } from "semantic-ui-react";
import api from "../services/api";
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;


class NewDosage extends Component {


    state = {
        animal_id: "",
        drug_id: "",
        dose_low: "",
        dose_high: "",
        dose_unit_id: "",
        notes: "",
        drugList: [],
        unitList: [],
        methodList: [],
        // below values for delivery
        chosenMethods: [],
        // below values for concentration
        conc_unit_id: "",
        chosenConcs: [],
        // new dosage ID
        newDosageId: "",
        // variable for new drug name
        new_drug_name: "",
        // for choosing drug to delete
        drug_to_delete: "",
    };
    setState = this.setState.bind(this);

    // Grab relevant information from DB
    componentDidMount() {
        // Retrieve drugs from the DB
        axios.get('https://vaddb.liamgombart.com/drugs')
            .then(response => {
                this.setState({ drugList: response.data });
            })
            .catch(error => {
                console.log(error);
            })

        // Retrieve units from the DB
        axios.get('https://vaddb.liamgombart.com/units')
            .then(response => {
                this.setState({ unitList: response.data });
            })
            .catch(error => {
                console.log(error);
            })
        // Retrieve methods from the DB
        axios.get('https://vaddb.liamgombart.com/methods')
            .then(response => {
                this.setState({ methodList: response.data });
            })
            .catch(error => {
                console.log(error);
            })
    }

    add = (e) => {
        e.preventDefault();
        //Create POST request for new dosage
        api
            .post("/dosages", {
                Authentication: API_KEY,
                animal_id: this.props.animal.animal_id,
                drug_id: this.state.drug_id,
                dose_low: this.state.dose_low,
                dose_high: this.state.dose_high,
                dose_unit_id: this.state.dose_unit_id,
                notes: this.state.notes,
            })
            .then((response) => {
                // Get new dosage id from response
                this.state.newDosageId = response.data.dosage_id;
                // Creates a new delivery for each chosen method
                const deliveryPromises = this.state.chosenMethods.map((method_id) =>
                    api.post(`/delivery`, {
                        Authentication: API_KEY,
                        dosage_id: this.state.newDosageId,
                        method_id: method_id,
                    })
                );
                // Create a new concentration for each chosen value
                const concentrationPromises = this.state.chosenConcs.map((value) =>
                    api.post(`/concentrations`, {
                        Authentication: API_KEY,
                        value: value,
                        unit_id: this.state.conc_unit_id,
                        dosage_id: this.state.newDosageId,
                    })
                );
                // Wait for all deliveries and concentrations to be created before reloading the page
                return Promise.all([...deliveryPromises, ...concentrationPromises]);
            })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                // Handle error and retry
            });
    };

    // Add a new drug to the DB
    addDrug = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/drugs`, {
                Authentication: API_KEY,
                name: this.state.new_drug_name,
            })
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    // Delete a drug from the DB
    delDrug = async (e) => {
        e.preventDefault();
        if (window.confirm("WARNING!! This will delete the DRUG and ALL of its DOSAGES!") === true) {
            try {
                // First get relevenat dosages and delete them.
                let response = await api.get(`dosages?drug_id=${this.state.drug_to_delete}`);
                for (let i = 0; i < response.data.length; i++) {
                    await api.delete(`/dosages/${response.data[i].dosage_id}`);
                }
                await api.delete(`/drugs/${this.state.drug_to_delete}`);
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }
    }

    render() {
        return (
            <div>
                <div style={{margin: 'auto'}}>
                <Grid columns={2}>
                    <Grid.Column computer={8} mobile={16}>
                        <form className="ui form" onSubmit={this.addDrug}>
                            <h2>Add New Drug to the Database</h2>
                            <Form.Group>
                                <Form.Input
                                    control={Input}
                                    name="new_drug_name"
                                    label="Drug Name: "
                                    onChange={(e, { value }) => this.setState({ new_drug_name: value })}
                                    required>
                                </Form.Input>
                            </Form.Group>
                            <Button className="drugButton" style={{ marginBottom: '20px' }}>Add Drug</Button>
                        </form>
                    </Grid.Column>
                    <Grid.Column computer={8} mobile={16}>
                        <form className="ui form" onSubmit={this.delDrug}>
                            <h2>Delete Drug from Database</h2>
                            <Form.Group>
                                <Form.Dropdown
                                    label="Drugs:   "
                                    search
                                    selection
                                    options={this.state.drugList.map(drug => ({ text: drug.name, value: drug.drug_id }))}
                                    name="drug_id"
                                    value={this.state.drug_to_delete}
                                    onChange={(e, { value }) => this.setState({ drug_to_delete: value })}
                                    required
                                />
                            </Form.Group>
                            <Button className="drugButton" style={{ marginBottom: '20px' }}>Delete Drug</Button>
                        </form>
                    </Grid.Column>
                </Grid>
                </div>
                <Form onSubmit={this.add}>
                    <h2>Add New Dosage for {this.props.animal.name}</h2>
                    <Form.Group width="equal">
                        <Form.Dropdown
                            label="Drug Name:   "
                            search
                            selection
                            options={this.state.drugList.map(drug => ({ text: drug.name, value: drug.drug_id }))}
                            name="drug_id"
                            value={this.state.drug_id}
                            onChange={(e, { value }) => this.setState({ drug_id: value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Dropdown
                            label="Methods:   "
                            search
                            selection
                            options={this.state.methodList.map(method => ({ text: method.name, value: method.method_id }))}
                            name="method_id"
                            multiple
                            value={this.state.chosenMethods}
                            onChange={(e, { value }) => this.setState({ chosenMethods: value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Dropdown
                            control={Input}
                            search
                            type='text'
                            name="conc_value"
                            label="Concentration Values: "
                            placeholder="(separate with commas)"
                            value={this.state.chosenConcs.join(',')}
                            onChange={(e) => {
                                const input = e.target.value;
                                const regex = /^[0-9.,]*$/;  // regular expression to match numbers, commas, and whitespace
                                if (regex.test(input)) {
                                    const concs = input.replace(/[^0-9.,]/g, '').split(',');  // remove non-numeric characters and split into an array
                                    this.setState({ chosenConcs: concs });
                                }
                            }}
                            required
                        />
                        <Form.Dropdown
                            label="Concentration Units:   "
                            search
                            selection
                            options={this.state.unitList.map(unit => ({ text: unit.name, value: unit.unit_id }))}
                            name="method_id"
                            value={this.state.conc_unit_id}
                            onChange={(e, { value }) => this.setState({ conc_unit_id: value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            control={Input}
                            type='number'
                            name="dose_low"
                            label="Dosage Range:   "
                            placeholder="Low"
                            value={this.state.dose_low}
                            onChange={(e) => this.setState({ dose_low: e.target.value })}
                            required
                        />
                        <Form.Field>to</Form.Field>
                        <Form.Input
                            control={Input}
                            type='number'
                            name="dose_high"
                            label="&nbsp;"
                            placeholder="High"
                            value={this.state.dose_high}
                            onChange={(e) => this.setState({ dose_high: e.target.value })}
                            required
                        />
                        <Form.Dropdown
                            search
                            name="dose_unit_id"
                            label="Dosage Unit"
                            selection
                            options={this.state.unitList.map(unit => ({ text: unit.name, value: unit.unit_id }))}
                            value={this.state.dose_unit_id}
                            onChange={(e, { value }) => this.setState({ dose_unit_id: value })}
                            required
                        />
                    </Form.Group>
                    <Form.Input
                        control={Input}
                        name="notes"
                        label="Notes:   "
                        placeholder="Notes"
                        value={this.state.notes}
                        onChange={(e, { value }) => this.setState({ notes: value })}
                    />
                    <button className="ui button blue">Add</button>
                </Form>
            </div>
        )
    }
}

export default NewDosage