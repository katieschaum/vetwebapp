import React from 'react';
import './App.css';
import Header from "./header";
import DropdownAnimalSearchQuery from './animalList';

function App() {
  
  return (
    <div className="ui container">
      <Header></Header>
      <br/>
      <h3 align='center'>Choose an animal from dropdown to view Dosages.</h3>
      <DropdownAnimalSearchQuery></DropdownAnimalSearchQuery>
    </div>
  );
};

export default App;
