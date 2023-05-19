import { React } from "react";
import { Component } from "react";
import { Form, Input, Grid, Button } from "semantic-ui-react";
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
            <div className="addAnimal">
                <Form onSubmit={this.add}>
                <h2 className="addAnimalHeader">Add an Animal</h2>
                <Form.Group>
                    <Form.Field
                    control={Input}
                    name="name"
                    label="Animal Name"
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
                    placeholder="Temperature Low"
                    value={this.state.temperature_low}
                    onChange={(e) => this.setState({ temperature_low: e.target.value })}
                    required
                    />
                <Form.Field
                    control={Input}
                    name="name"
                    label="Temperature High"
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
                    placeholder="Heart Rate Low"
                    value={this.state.heart_rate_low}
                    onChange={(e) => this.setState({ heart_rate_low: e.target.value })}
                    required
                    />
                <Form.Field
                    control={Input}
                    name="name"
                    label="Heart Rate High"
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
                    placeholder="Respiratory Rate Low"
                    value={this.state.respiratory_rate_low}
                    onChange={(e) => this.setState({ respiratory_rate_low: e.target.value })}
                    required
                    />
                <Form.Field
                    control={Input}
                    name="name"
                    label="Respiratory Rate High"
                    placeholder="Respiratory Rate High"
                    value={this.state.respiratory_rate_high}
                    onChange={(e) => this.setState({ respiratory_rate_high: e.target.value })}
                    required
                    />
                </Form.Group>
                <Button className="addAnimalButton" color="blue">Add</Button>
                </Form>
            </div>
        )
    }
}

export default AddAnimal;