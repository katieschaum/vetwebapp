import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../services/api";
import { Loader, Form, Header, Button, List, Icon, Grid } from 'semantic-ui-react';



const EditAnimal = () => {

    // Retrieve animal ID from params
    const { animalId } = useParams();
    const [animalOptions, setAnimalOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get(`/animals/${animalId}`)
            .then(response => {
                const animal = response.data;
                const animalOptions = {
                    key: animal.animal_id,
                    name: animal.name,
                    temperature_low: animal.temperature_low,
                    temperature_high: animal.temperature_high,
                    heart_rate_low: animal.heart_rate_low,
                    heart_rate_high: animal.heart_rate_high,
                    respiratory_rate_low: animal.respiratory_rate_low,
                    respiratory_rate_high: animal.respiratory_rate_high,
                };
                setAnimalOptions([animalOptions]);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error: retrieving animal data.")
                setIsLoading(false);
            })
    }, [animalId]);

    // Function for updating animal DB entry
    function updateAnimal(animalId, formData) {
        return api.put(`/animals/${animalId}`, formData);
    }

    // Function for handling form
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        updateAnimal(animalId, formData)
            .then(response => {
                console.log("Animal updated successfully.", response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error("Error: updating animal data.", error);
            })
    }

    // Form submit Modal **IMPLEMENT**
    // const [openModal, setOpenModal] = useState(false);
    // const handleOpenModal = () => setOpenModal(true);
    // const handleCloseModal = () => setOpenModal(false);


    return (
        <div>

            {isLoading ? (
                <Loader></Loader>
            ) : (
                <div style={{overflow: 'hidden'}}>

                    <Button href='/' style={{ marginTop: '40px', marginBottom: '50px', marginLeft: '50px' }}>Back</Button>

                    <Grid columns={2}>
                        <Grid.Column computer={11} mobile={16}>
                            <Header style={{ padding: '10px', paddingBottom: '20px' }} as={'h1'}>Edit Data:</Header>
                            <Form onSubmit={handleSubmit} style={{ width: '70%', justifyContent: 'center', margin: 'auto', boxShadow: '2px 4px 8px 0 rgba(0, 0, 0, 0.2)', padding: '10px', borderRadius: '5px', backgroundColor: 'whitesmoke' }}>
                                <Header style={{ paddingTop: '10px', paddingBottom: '10px' }} as={'h2'}>{animalOptions[0].name}</Header>
                                <Form.Group widths='equal'>
                                    <Form.Input name='name' label='Animal Name' defaultValue={animalOptions[0].name}></Form.Input>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input name='temperature_low' label='Temperature Low:' defaultValue={animalOptions[0].temperature_low}></Form.Input>
                                    <Form.Input name='temperature_high' label='Temperature High:' defaultValue={animalOptions[0].temperature_high}></Form.Input>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input name='heart_rate_low' label='Heart Rate Low:' defaultValue={animalOptions[0].heart_rate_low}></Form.Input>
                                    <Form.Input name='heart_rate_high' label='Heart Rate High:' defaultValue={animalOptions[0].heart_rate_high}></Form.Input>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input name='respiratory_rate_low' label='Respiratory Rate Low:' defaultValue={animalOptions[0].respiratory_rate_low}></Form.Input>
                                    <Form.Input name='respiratory_rate_high' label='Respiratory Rate High' defaultValue={animalOptions[0].respiratory_rate_high}></Form.Input>
                                </Form.Group>
                                <Form.Button className='editAnimalButton' style={{ marginTop: '10px', marginBottom: '10px' }} primary>Submit Changes</Form.Button>
                            </Form>
                        </Grid.Column>

                        <Grid.Column computer={5} mobile={16}>
                            <Header className='currentDataHeader' style={{ padding: '10px', paddingBottom: '20px', textAlign: 'center', marginRight: '50%' }} as={'h2'}>Curent Data:</Header>
                            <List className='currentDataElements' celled style={{ width: '50%', justifyContent: 'center', margin: 'auto', textAlign: 'center', marginRight: '50%' }}>
                                <List.Item>
                                    <Icon color='blue' name='user'></Icon>
                                    <List.Header>Animal Name: </List.Header>
                                    <List.Content>{animalOptions[0].name}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <Icon style={{ color: '#e60000' }} name='thermometer quarter'></Icon>
                                    <List.Header>Temperature Low</List.Header>
                                    <List.Content>{animalOptions[0].temperature_low}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <Icon style={{ color: '#990000' }} name='thermometer three quarters'></Icon>
                                    <List.Header>Temperature High</List.Header>
                                    <List.Content>{animalOptions[0].temperature_high}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <Icon style={{ color: '#ffb3b3' }} name='heartbeat'></Icon>
                                    <List.Header>Heart Rate Low:</List.Header>
                                    <List.Content>{animalOptions[0].heart_rate_low}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <Icon style={{ color: '#ff6666' }} name='heartbeat'></Icon>
                                    <List.Header>Heart Rate High: </List.Header>
                                    <List.Content>{animalOptions[0].heart_rate_high}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <Icon style={{ color: '#80bfff' }} name='stethoscope'></Icon>
                                    <List.Header>Respiratory Low:</List.Header>
                                    <List.Content>{animalOptions[0].respiratory_rate_low}</List.Content>
                                </List.Item>
                                <List.Item>
                                    <Icon style={{ color: '#3399ff' }} name='stethoscope'></Icon>
                                    <List.Header>Respiratory High: </List.Header>
                                    <List.Content>{animalOptions[0].respiratory_rate_high}</List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid>

                </div>
            )}
        </div>
    );
}

export default EditAnimal