import React from "react";
import { Form, Input } from "semantic-ui-react";
import api from "../services/api";

// Adds a new drug to the table of a given animal
class addDrug extends React.Component {

    state = {
        name: "",
        method: "",
        concentration: "",
        concentrationUnit: "",
        doseLow: "",
        doseHigh: "",
        dosageUnit: "",
        notes: ""
    };
    setState=this.setState.bind(this)

    add = (e) => {
        e.preventDefault();
        
        if (this.state.name === "") {
            alert("Drug field is mandatory!");
            return;
        }
        api.post('/drugs', {
            drug_id: 'drug_id',
            name: this.state.name
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        this.props.addDrugHandler(this.state);
        this.setState({ id: "", name: "", method: "", concentration: "", concentrationUnit: "", doseLow: "", doseHigh: "", dosageUnit: "", notes: "" });
    };
    render() {
        return (
            <div className="ui main">
                <h2> Add Drug</h2>
                <form className="ui form" onSubmit={this.add}>
                <Form.Group width="equal">
                    <Form.Field
                    control={Input}
                    name="name"
                    label="Drug Name"
                    style= {{width: "925px"}}
                    placeholder="Drug Name"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                    />
                    
                    <Form.Field
                        control={Input}
                        name="method"
                        label="Method"
                        placeholder="Method"
                        className="right aligned"
                        value={this.state.method}
                        onChange={(e) => this.setState({ method: e.target.value })}
                    />
                    </Form.Group>

                    <Form.Group>
                    <Form.Field
                        
                        control={Input}
                        name="concentration"
                        label="Concentration"
                        style={{width: 125}}
                        placeholder="Concentration"
                        value={this.state.concentration}
                        onChange={(e) => this.setState({ concentration: e.target.value })}
                    />   
                    <Form.Field
                        control={Input}
                        options={[
                                      { key: 'mg/kg', text: 'mg/kg', value: 'mg/kg' },
                                      { key: 'µg/kg', text: 'µg/kg', value: 'µg/kg' },
                                      { key: 'ml/kg', text: 'ml/kg', value: 'ml/kg' },
                                    ]}
                        name="concentrationUnit"
                        label="Concentration Unit"
                        placeholder="mg/kg"
                        value={this.state.options}
                        onChange={(e) => this.setState({ concentrationUnit: e.target.value })}
                    />
                    </Form.Group>

                    <Form.Group>
                    <Form.Field
                        control={Input}
                        style={{width: 125}}
                        name="doseLow"
                        label="Dosage Range"
                        placeholder="Dosage Low"
                        value={this.state.doseLow}
                        onChange={(e) => this.setState({ doseLow: e.target.value })}
                    />
                    <Form.Field>to</Form.Field>
                    <Form.Field
                        control={Input} 
                        style={{width: 125}} 
                        name="doseHigh" 
                        label="&nbsp;"
                        placeholder="Dosage High"
                        value={this.state.doseHigh}
                        onChange={(e) => this.setState({ doseHigh: e.target.value })}/>     
                    <Form.Field
                        control={Input} 
                        name="doseUnit" 
                        label="Dosage Unit"
                        placeholder="Dosage Unit"
                        value={this.state.doseUnit}
                        onChange={(e) => this.setState({ doseUnit: e.target.value })}/>
                    </Form.Group>
                    
                    <Form.Field
                        control={Input}
                        name="notes"
                        label="Notes"
                        placeholder="Notes"
                        value={this.state.notes}
                        onChange={(e) => this.setState({ notes: e.target.value })}
                    />
                   
                    <button className="ui button blue">Add</button>
                </form>
            </div>
        );
    }
}

export default addDrug;