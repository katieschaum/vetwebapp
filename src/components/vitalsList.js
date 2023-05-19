import React, { useEffect } from "react";
import { Item, Table, List, Header, Grid } from "semantic-ui-react";
import api from "../services/api";


// Creates the table with the animals expected biometrics

const VitalsCard = (props) => {
    // function get(){
    //     api.get('/animals', {
    //         //drug_id: 161,
    //         name: this.state.name,
    //         temperature_low: this.state.temperature_low,
    //         temperature_high: this.state.temperature_high,
    //         heart_rate_low: this.state.heart_rate_low,
    //         heart_rate_high: this.state.heart_rate_high,
    //         respiratory_rate_low: this.state.respiratory_rate_low,
    //         respiratory_rate_high: this.state.respiratory_rate_high,
    //         Authentication: "simian_army_makes_chaos"
    //       })
          
    //       .then(response=> response.json().
    //         then(data=>{
    //             ReactDOM.render(<Table data={data}/>, document.getElementById())

    //         }))
            
        

          
    //     return;
    // }
    // const { temperature_low, temperature_high, 
    //     heart_rate_low, heart_rate_high, 
    //     respiratory_rate_low, respiratory_rate_high} = "5";

    return(
        <div>
        <Table className="vitalsTable">
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Temp Low</Table.HeaderCell>
                <Table.HeaderCell>Temp High</Table.HeaderCell>
                <Table.HeaderCell>Heart Rate Low</Table.HeaderCell>
                <Table.HeaderCell>Heart Rate High</Table.HeaderCell>
                <Table.HeaderCell>Respiratory Rate Low</Table.HeaderCell>
                <Table.HeaderCell>Respiratory Rate High</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
        <Table.Row>
            <Table.Cell>
                <div>{props.currentAnimal.temperature_low}</div>
            </Table.Cell>
            <Table.Cell>
                <div>{props.currentAnimal.temperature_high}</div>
            </Table.Cell>
            <Table.Cell>
                <div>{props.currentAnimal.heart_rate_low}</div>
            </Table.Cell>
            <Table.Cell>
                <div>{props.currentAnimal.heart_rate_high}</div>
            </Table.Cell>
            <Table.Cell>
                <div>{props.currentAnimal.respiratory_rate_low}</div>
            </Table.Cell>
            <Table.Cell>
                <div>{props.currentAnimal.respiratory_rate_high}</div>
            </Table.Cell>
        </Table.Row>
        
        </Table.Body>
        </Table>

        <div style={{justifyContent: 'center', marginBottom: '30px', marginTop: '30px'}} className="hideDesktop">
        <Grid>
            <Grid.Row>
                <Grid.Column mobile={8}><Header as={'h5'}><u>Temp Low: </u>{props.currentAnimal.temperature_low}</Header></Grid.Column>
                <Grid.Column mobile={8}><Header as={'h5'}><u>Temp High:</u> {props.currentAnimal.temperature_high}</Header></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column mobile={8}><Header as={'h5'}><u>Heart Rate Low:</u> {props.currentAnimal.heart_rate_low}</Header></Grid.Column>
                <Grid.Column mobile={8}><Header as={'h5'}><u>Heart Rate High:</u> {props.currentAnimal.heart_rate_high}</Header></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column mobile={8}><Header as={'h5'}><u>Resp. Rate Low:</u> {props.currentAnimal.respiratory_rate_low}</Header></Grid.Column>
                <Grid.Column mobile={8}><Header as={'h5'}><u>Resp. Rate High:</u> {props.currentAnimal.respiratory_rate_high}</Header></Grid.Column>
            </Grid.Row>
        </Grid>
        </div>
        

        </div>
    );
};

export default VitalsCard