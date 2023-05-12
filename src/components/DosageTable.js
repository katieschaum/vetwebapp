import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import Header from "./header";
import AddDosage from "./addDosage";
import DosageList from "./dosageList";
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import VitalsCard from './vitalsList';
import { AnimalContext } from '../context/animal_context';
import processDosages from '../services/deref';
import axios from 'axios';
import api from '../services/api';

const dosageUri = `https://vaddb.liamgombart.com/deref/dosages`

// Main animal page with add/edit/delete handlers and data for specific animals
const DosageTable = () => {
  const navigate = useNavigate();
  const context = useContext(AnimalContext);

  const [dosages, setDosages] = useState({
    dosages: [],
  });

  const [vitals, setVitals] = useState(context.currentAnimal);

  useEffect(() => {
    getDosages();
  }, []);
  

  const getDosages = async () => {
    // alert(animal_id);
    // localStorage.removeItem("animal_id");
    var animal_id = 0;
    var newVitals = null;
    if(context.currentAnimal.animal_id === undefined){
      setVitals( JSON.parse(localStorage.getItem("vitals")));
      animal_id = localStorage.getItem("animal_id");
      // newVitals = 
      //localStorage.removeItem("animal_id");
    //  alert("id st: "+animal_id);
    }
    else{
      // if(localStorage.getItem("animal_id")){
      //  //localStorage.removeItem("animal_id");       
      // }
      animal_id = context.currentAnimal.animal_id;
      localStorage.setItem("vitals", JSON.stringify(context.currentAnimal));
      setVitals(context.currentAnimal);

      console.log("id context: "+animal_id);
    }
      
      // alert("animal_id?"+animal_id);
      
      const  newDosages = await processDosages(`${dosageUri}?animal_id=${animal_id}`);  
      setDosages({
        ...dosages, 
        dosages: newDosages,
      }); 
     // setVitals(newVitals);
      console.log("vitals list updated:",newVitals);
    }
    // else{

    //   const animal_id = context.currentAnimal.animal_id;
    //   const newDosages = await processDosages(`${dosageUri}?animal_id=${animal_id}`);  
    //   setDosages({
    //     ...dosages, 
    //     dosages: newDosages,
    //   });
    //   console.log("dosages list first:",newDosages);
    // }
    
   

  

  const getDosages02 = async () => {
    // const animal_id = localStorage.getItem("animal_id");
    // console.log("Animal ID: "+animal_id);
    // const newDosages = await processDosages(`${dosageUri}?animal_id=${animal_id}`);
    
    // setDosages({
    //   ...dosages, 
    //   dosages: newDosages,
    // });

  }

    const addDosageHandler = (dosage) => {
    console.log('adding dosage');
  };
  
  const editDosageHandler = (dosage) => {
    console.log('editing dosage');
    // let newDosages = [...dosages]
    // let index = newDosages.findIndex(d => d.id === dosage.id)
    // if (index < 0) return addDosageHandler(dosage)
    // newDosages[index] = dosage
    // console.log(dosage);
    // setDosages(newDosages);
  };

  // const removeDosageHandler = async (id) => {
  //   console.log('removing dosage');
  
  //   // Use the spread operator to create a new array with all the dosages except for the one with the matching `id`
  //   const updatedDosages = [...dosages].filter((dosage) => dosage.id !== id);
  
  //   try {
  //     await api.delete(`/dosages/${id}`);
  
  //     // If the request is successful, update the `dosages` state to reflect the changes
  //     setDosages(updatedDosages);
  
  //     alert("Dosage deleted successfully!");
  //   } catch (error) {
  //     alert("Error deleting dosage. Please try again.");
  //     console.error(error);
  //   }
  // };
  
  // const removeDosageHandler = (id) => {
  //   console.log('removing dosage');
  //   if (window.confirm("Are you sure you want to delete?") === true){
  //     const newDosageList = dosages.filter((dosage) => {
  //     return dosage.id !== id;
  //   });

  //   setDosages(newDosageList);
  //   };
  // }

  // if (window.confirm("Are you sure you want to delete?") === true){
  //   const newDrugList = drugs.filter((drug) => {
  //     return drug.id !== id;
  //   });
  
  const removeDosageHandler = async (id) => {
    console.log('removing dosage');
    console.log(id);
    if (window.confirm("Are you sure you want to delete?") === true){
      const filterDosage = Object.entries(dosages.dosages);
      const updatedDosages = dosages.dosages.filter((dosage) => {
        
        console.log(dosage.dosage_id);
  
        return dosage.dosage_id !== id;
      });

      const newDosage = [];
      filterDosage.forEach((item)=>{
        // console.log(item.dosage_id);
        newDosage.push(item);
      });
      // const test = dosages.filter((dosage) => {return dosage.id !== id});
      console.log(filterDosage);
        await api.delete("dosages/"+id);  // request error 400 "bad request"
        // console.log("Older Dosage: ");
        // console.log(dosages);
        // console.log("New Dosage: ");
        console.log(Object.entries(updatedDosages));

        // const arrayDosage = Array.from(updatedDosages);
        // setDosages(newDosage);
        setDosages({
          ...dosages,
          dosages: updatedDosages,
        })
        // await api.delete("dosages", {id:id}); // like in swagger test, always showing "not found"
      };
    // const newDosageList = dosages.filter((dosage) => {
    //   return dosage.id !== id;
    
  }

  const showInfo = async () => {
    console.log(dosages);
  }

  return (
    <div className="ui container">
      <Header></Header>
      <Button onClick={()=>navigate(-1)}>Back</Button>
      <h1>{window.location.pathname.split("/").pop()}</h1>
      <h3>Vitals</h3>
      <VitalsCard currentAnimal={vitals}></VitalsCard>
      <AddDosage getDosages={getDosages} animal={context.currentAnimal.name} AnimalHandler={addDosageHandler}> </AddDosage> 
      <h2>Dosage List for {context.currentAnimal.name}</h2>
      <DosageList  dosages={dosages.dosages} editDosageHandler={editDosageHandler} deleteDosageHandler={removeDosageHandler}></DosageList>
    {/* <button onClick={showInfo}>Show Dosages for {context.currentAnimal.name}</button> */}
    <br/>
    </div>
  );
};

export default DosageTable;
