import React, { useState, useEffect } from 'react';
import { v4 as uuid } from "uuid";
import './App.css';
import Header from "./header";
import AddDrug from "./addDrug";
import DrugList from "./drugList";
import { useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

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

  const removeDrugHandler = (id) => {
    const newDrugList = drugs.filter((drug) => {
      return drug.id !== id;
    });

    setDrugs(newDrugList);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drugs));
  }, [drugs]);

  return (
    <div className="ui container">
      <Header></Header>
      <Button href="javascript: history.go(-1)">Back</Button>
      <h1>{animal}</h1>
      <AddDrug animal={animal} addDrugHandler={addDrugHandler}> </AddDrug>
      <DrugList drugs={animalDrugs} deleteDrugHandler={removeDrugHandler}></DrugList>
    </div>
  );
};

export default DrugTable;
