import React, { useState, useEffect, Component } from 'react';
import { v4 as uuid } from "uuid";
import './App.css';
import Header from "./header";
import AddDrug from "./addDrug";
import DrugList from "./drugList";
import { useParams } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';
import VitalsCard from './vitalsList';

// Main animal page with add/edit/delete handlers and data for specific animals
function DrugTable() {
  let {animal}=useParams()
  const LOCAL_STORAGE_KEY = "drugs";
  const [drugs, setDrugs] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  let animalDrugs=drugs.filter(d=>d.animal.toLowerCase()===animal.toLowerCase());
  console.log(animal)
  console.log(animalDrugs);
  console.log(drugs);

  const addDrugHandler = (drug) => {
    console.log(drug);
    setDrugs([...drugs, { id: uuid(), animal:animal, ...drug }]);
  };

  const editDrugHandler = (drug) => {
    let newDrugs = [...drugs]
    let index = newDrugs.findIndex(d => d.id === drug.id)
    if (index < 0) return addDrugHandler(drug)
    newDrugs[index] = drug
    console.log(drug);
    setDrugs(newDrugs);
  };

  const removeDrugHandler = (id) => {
    if (window.confirm("Are you sure you want to delete?") == true){
    const newDrugList = drugs.filter((drug) => {
      return drug.id !== id;
    });

    setDrugs(newDrugList);
  };
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drugs));
  }, [drugs]);

  return (
    <div className="ui container">
      <Header></Header>
      <Button href="javascript: history.go(-1)">Back</Button>
      <h1>{animal}</h1>
      <h3>Vitals</h3>
      <VitalsCard></VitalsCard>
      <h3>Drug List for {animal}s</h3>
      <DrugList drugs={animalDrugs} editDrugHandler={editDrugHandler} deleteDrugHandler={removeDrugHandler}></DrugList>
      <AddDrug animal={animal} addDrugHandler={addDrugHandler}> </AddDrug>      
    </div>
  );
};

export default DrugTable;
