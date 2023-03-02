import React from 'react';
import './App.css';
import Header from "./header";
import DropdownAnimalSearchQuery from './animalList';
import { Button, Grid } from 'semantic-ui-react';

function App() {
  
  return (
    <div className="ui container">
      <Header></Header>
      <br/>
      <h3 align='center'> Which Animal Would You Like to See?</h3>
      <DropdownAnimalSearchQuery>  </DropdownAnimalSearchQuery>
      <br/><br/><br/>
      {/* Created buttons for each animal since the dropdown isn't working yet. */}
      {/* <Grid>
        <Grid.Column textAlign="center">
          <Button basic color='violet' href='/drugs/cat'>Cat</Button>
          <Button basic color='violet' href='/drugs/camelid'>Camelid</Button>
          <Button basic color='violet' href='/drugs/cattle'>Cattle</Button>
          <Button basic color='violet' href='/drugs/dog'>Dog</Button>
          <Button basic color='violet' href='/drugs/equine'>Equine</Button>
          <Button basic color='violet' href='/drugs/goat_sheep'>Goat/Sheep</Button>
          <Button basic color='violet' href='/drugs/swine'>Swine</Button>
          <Button basic color='violet' href='/drugs'>All</Button>
        </Grid.Column>
      </Grid> */}
    </div>
  );
};

export default App;
