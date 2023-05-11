import { React } from "react";
import { Component } from "react";
import { Form, Input } from "semantic-ui-react";
import api from "../services/api";

const API_KEY = process.env.REACT_APP_API_KEY;

class AddAnimal extends Component {
    
    state = {
        name: "",
        temperature_low: "",
        temperature_high: "",
        heart_rate_low: "",
        heart_rate_high: "",
        respiratory_rate_low: "",
        respiratory_rate_high: "",
    };
    setState=this.setState.bind(this)


    add = (e) => {
        e.preventDefault();
        // Create POST request for new animal
        api.post('/animals', {
            Authentication: API_KEY,
            name: this.state.name,
            temperature_low: this.state.temperature_low,
            temperature_high: this.state.temperature_high,
            heart_rate_low: this.state.heart_rate_low,
            heart_rate_high: this.state.heart_rate_high,
            respiratory_rate_low: this.state.respiratory_rate_low,
            respiratory_rate_high: this.state.respiratory_rate_high,
        })
        .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
    }

    render() {
        return (
            <div className="addAnimal" style={{display: "flex", justifyContent: "center"}}>
                <form className="ui form" onSubmit={this.add}>
                <h2>Add an Animal</h2>
                <Form.Group width="equal">
                    <Form.Field
                    control={Input}
                    name="name"
                    label="Animal Name"
                    style= {{width: "515px"}}
                    placeholder="Animal Name"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                    required
                    />
                </Form.Group>
                <Form.Group>
                <Form.Field
                    control={Input}
                    name="name"
                    label="Temperature Low"
                    style= {{width: "250px"}}
                    placeholder="Temperature Low"
                    value={this.state.temperature_low}
                    onChange={(e) => this.setState({ temperature_low: e.target.value })}
                    required
                    />
                <Form.Field
                    control={Input}
                    name="name"
                    label="Temperature High"
                    style= {{width: "250px"}}
                    placeholder="Temperature High"
                    value={this.state.temperature_high}
                    onChange={(e) => this.setState({ temperature_high: e.target.value })}
                    required
                    />
                </Form.Group>
                <Form.Group>
                <Form.Field
                    control={Input}
                    name="name"
                    label="Heart Rate Low"
                    style= {{width: "250px"}}
                    placeholder="Heart Rate Low"
                    value={this.state.heart_rate_low}
                    onChange={(e) => this.setState({ heart_rate_low: e.target.value })}
                    required
                    />
                <Form.Field
                    control={Input}
                    name="name"
                    label="Heart Rate High"
                    style= {{width: "250px"}}
                    placeholder="Heart Rate High"
                    value={this.state.heart_rate_high}
                    onChange={(e) => this.setState({ heart_rate_high: e.target.value })}
                    required
                    />
                </Form.Group>
                <Form.Group>
                <Form.Field
                    control={Input}
                    name="name"
                    label="Respiratory Rate Low"
                    style= {{width: "250px"}}
                    placeholder="Respiratory Rate Low"
                    value={this.state.respiratory_rate_low}
                    onChange={(e) => this.setState({ respiratory_rate_low: e.target.value })}
                    required
                    />
                <Form.Field
                    control={Input}
                    name="name"
                    label="Respiratory Rate High"
                    style= {{width: "250px"}}
                    placeholder="Respiratory Rate High"
                    value={this.state.respiratory_rate_high}
                    onChange={(e) => this.setState({ respiratory_rate_high: e.target.value })}
                    required
                    />
                </Form.Group>
                <button className="ui button blue">Add</button>
                </form>
            </div>
        )
    }
}

export default AddAnimal;