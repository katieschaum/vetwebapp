import { React, useState, useEffect } from "react";
import { Component } from "react";
import { useParams } from 'react-router-dom';
import { Form, Input } from "semantic-ui-react";
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
    };
    setState = this.setState.bind(this);

    // Grab relevant information from DB
    componentDidMount() {
        // Retrieve drugs from the DB
        axios.get('https://vaddb.liamgombart.com/drugs')
          .then(response => {
            this.setState({ drugList: response.data });
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          })
      
        // Retrieve units from the DB
        axios.get('https://vaddb.liamgombart.com/units')
          .then(response => {
            this.setState({ unitList: response.data });
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          })
      }

    add = (e) => {
        e.preventDefault();
        // this.state.animal_id = this.props.animal.animal_id
        // console.log(this.state)
        //Create POST request for new dosage
        api.post('/dosages', {
            Authentication: API_KEY,
            animal_id: this.props.animal.animal_id,
            drug_id: this.state.drug_id,
            dose_low: this.state.dose_low,
            dose_high: this.state.dose_high,
            dose_unit_id: this.state.dose_unit_id,
            notes: this.state.notes,
        })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <form className="ui form" onSubmit={this.add}>
                    <h2>Add New Dosage for {this.props.animal.name}</h2>
                    <Form.Group width="equal">
                        <Form.Dropdown
                            label="Drug Name:   "
                            search
                            style={{ width: "700px" }}
                            selection
                            options={this.state.drugList.map(drug => ({ text: drug.name, value: drug.drug_id }))}
                            name="drug_id"
                            value={this.state.drug_id}
                            onChange={(e, { value }) => this.setState({ drug_id: value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            control={Input}
                            type='number'
                            style={{ width: 100 }}
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
                            style={{ width: 100 }}
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
                        style={{ width: 700 }}
                        name="notes"
                        label="Notes:   "
                        placeholder="Notes"
                    />
                    <button className="ui button blue">Add</button>
                </form>
            </div>
        )
    }
}

export default NewDosage